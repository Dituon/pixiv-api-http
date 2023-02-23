import express from 'express'
import bodyParser from 'body-parser'
import proxy from 'express-http-proxy'

import config from '../../config.js'

import {getPidIllust, getPidImage, getPidImageList, getPidManga} from './module/illust/index.js'
import {getPidNovelSeries, getPidNovelSeriesContent, getPidNovelSeriesInfo, getPidNovel} from './module/novel/index.js'
import {searchFormat} from './module/search/search.js'
import {imageServerHost, rawHost} from "../pixiv-fetch/replace-url.js";

/**
 * @param {Function} asyncFun
 * @param  {...string} params
 * @return {Function}
 */
export const callbackFactory = (asyncFun, ...params) => async (req, res, next) => {
    try {
        const data = await asyncFun(...params.map(p => req.params[p]))
        res.json(data)
    } catch (e) {
        console.warn(e)
        res.status(400).send(e)
    }
    next()
}


export const app = express()
app.use(bodyParser.json())
app.listen(config.server.port, config.server.host)

// illust
app.get('/illust/:id', callbackFactory(getPidIllust, 'id'))
app.get('/illust/:id/images', callbackFactory(getPidImageList, 'id'))
app.get('/illust/:id/images/:page', callbackFactory(getPidImage, 'id', 'page'))

// manga
app.get('/manga/:id', callbackFactory(getPidManga, 'id'))

// novel
app.get('/novel/:id', callbackFactory(getPidNovel, 'id'))
app.get('/novel/series/:id', callbackFactory(getPidNovelSeries, 'id'))
app.get('/novel/series/:id/info', callbackFactory(getPidNovelSeriesInfo, 'id'))
app.get('/novel/series/:id/content', callbackFactory(getPidNovelSeriesContent, 'id'))

// search
app.post('/search', async (req, res, next) => {
    const data = await searchFormat(req.body)
    res.json(data)
    next()
})

// proxy
if (config.proxy.useLocalProxy) app.use(
    '/proxy',
    proxy(config.proxy.useOriginIP ? imageServerHost : rawHost,
        {
            proxyReqOptDecorator: opts => {
                opts.headers['Referer'] = 'https://www.pixiv.net/'
                return opts
            },
            https: !config.proxy.useOriginIP
        })
)
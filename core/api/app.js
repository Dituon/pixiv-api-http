import express from 'express'
import bodyParser from 'body-parser'
import proxy from 'express-http-proxy'

import config from '../../config.js'

import {getPidIllust, getPidImage, getPidImageList, getPidManga} from './module/illust/index.js'
import {getPidNovelSeries, getPidNovelSeriesContent, getPidNovelSeriesInfo, getPidNovel} from './module/novel/index.js'
import {searchFormat} from './module/search/search.js'
import {imageServerHost, rawHost} from "../pixiv-fetch/replace-url.js";
import {getPidRecommend, getPidRecommendIds} from "./module/illust/recommend.js";
import {getFollowUpdateFormat} from "./module/follow/follow.js";
import {initFollowUpdatePush} from "./module/follow/update-push.js";

export const app = express()
app.use(bodyParser.json())
app.use((req, res, next) => {
    req.body = {...req.query, ...req.body}
    next()
})
app.listen(config.httpServer.port, config.httpServer.host)

// illust
app.all('/illust/:id', async (req, res) => {
    res.json(await getPidIllust(req.params.id))
})
app.all('/illust/:id/images', async (req, res) => {
    res.json(await getPidImageList(req.params.id))
})
app.all('/illust/:id/images/:page', async (req, res) => {
    res.json(await getPidImage(req.params.id, req.params.page))
})
app.all('/illust/:id/recommend', async (req, res) => {
    res.json(await getPidRecommend(req.params.id, req.body.size))
})

app.all('/illust/:id/recommend/ids', async (req, res) => {
    res.json(await getPidRecommendIds(req.params.id, req.body.size))
})


// manga
app.all('/manga/:id', async (req, res) => {
    res.json(await getPidManga(req.params.id))
})

// novel
app.all('/novel/:id', async (req, res) => {
    res.json(await getPidNovel(req.params.id))
})
app.all('/novel/series/:id', async (req, res) => {
    res.json(await getPidNovelSeries(req.params.id))
})
app.all('/novel/series/:id/info', async (req, res) => {
    res.json(await getPidNovelSeriesInfo(req.params.id))
})
app.all('/novel/series/:id/content', async (req, res) => {
    res.json(await getPidNovelSeriesContent(req.params.id))
})

// search
app.all('/search', async (req, res) => {
    res.json(await searchFormat(req.body))
})

// follow
app.all('/follow', async (req, res) => {
    res.json(await getFollowUpdateFormat(req.body))
})

app.all('/follow/:type', async (req, res) => {
    res.json(await getFollowUpdateFormat({type: req.params.type, ...req.body}))
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

// follow update
if (config.pixiv.followUpdate.enable) initFollowUpdatePush()

app.use((err, req, res, next) => {
    console.warn(err.stack)
    res.status(400).send(err.message)
})
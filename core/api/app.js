import express from 'express'
import bodyParser from 'body-parser'

import { getPidIllust, getPidImage, getPidImageList, getPidManga } from './module/illust/index.js'
import { getPidNovelSeries, getPidNovelSeriesContent, getPidNovelSeriesInfo, getPidNovel } from './module/novel/index.js'
import { searchFormat } from './module/search/search.js'

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
app.listen(1145)

app.get('/illust/:id', callbackFactory(getPidIllust, 'id'))

app.get('/illust/:id/images', callbackFactory(getPidImageList, 'id'))

app.get('/illust/:id/images/:page', callbackFactory(getPidImage, 'id', 'page'))

app.get('/manga/:id', callbackFactory(getPidManga, 'id'))

app.get('/novel/:id', callbackFactory(getPidNovel, 'id'))

app.get('/novel/series/:id', callbackFactory(getPidNovelSeries, 'id'))

app.get('/novel/series/:id/info', callbackFactory(getPidNovelSeriesInfo, 'id'))

app.get('/novel/series/:id/content', callbackFactory(getPidNovelSeriesContent, 'id'))

app.post('/search', async (req, res, next) => {
    const data = await searchFormat(req.body)
    res.json(data)
    next()
})


import express from 'express'
import bodyParser from 'body-parser'

import { getPidIllust, getPidImage, getPidImageList } from './module/illust/index.js'
import { getPidNovelSeriesInfo } from './module/novel/index.js'
import { getPidNovel } from './module/novel/pid.js'
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

app.get('/novel/:id', callbackFactory(getPidNovel, 'id'))

app.get('/novel/series/:id', callbackFactory(getPidNovelSeriesInfo, 'id'))

app.post('/search', async (req, res, next) => {
    console.log(req.body)
    const data = await searchFormat(req.body)
    res.json(data)
    next()
})


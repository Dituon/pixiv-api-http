import express from 'express'
import { getPidIllust, getPidImage, getPidImageList } from './module/illust/index.js'

/**
 * @param {Function} asyncFun
 * @param  {...string} params
 * @return {Function}
 */
export const callbackFactory = (asyncFun, ...params) => async (req, res, next) => {
    try {
        const data = await asyncFun(...params.map(p => req.params[p]))
        // res.json(data)
        res.json(data)
    } catch (e) {
        console.warn(e)
        res.status(400).send(e)
    }
    next()
}


export const app = express()
app.listen(1145)

app.get('/illust/:id', callbackFactory(getPidIllust, 'id'))

app.get('/illust/:id/images', callbackFactory(getPidImageList, 'id'))

app.get('/illust/:id/images/:page', callbackFactory(getPidImage, 'id', 'page'))




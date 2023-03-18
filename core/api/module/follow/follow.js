import {pixivJsonFetch, replaceURL} from "../../../pixiv-fetch/index.js";
import config from "../../../../config.js";
import {search, searchFormat} from "../search/index.js";
import {fixParam} from "../search/no-premium.js";

const PAGE_SIZE = 60
const lang = config.pixiv.lang

/**
 * @typedef {object} FollowUpdateParam
 * @property { 'illust' | 'novel' } type
 * @property {Restrict} [restrict='safe']
 * @property {Restrict} [mode]
 * @property {number} [start=0]
 * @property {number} [length=60]
 * @property {number} [p=1]
 * @property {Lang} [lang]
 */

const defaultParam = {
    mode: 'all',
    type: 'illust',
    start: 0,
    length: 60,
    lang
}

/**
 * @param {FollowUpdateParam} param
 * @return {Promise<ResultPreviewDTO[]>}
 */
export async function getFollowUpdateFormat(param) {
    param.mode = param.restrict ?? 'safe'
    param = {...defaultParam, ...param}
    if (param.p) return getFollowUpdate(param)

    const promiseArr = []

    param.start = +param.start
    param.length = +param.length
    let end = param.start + param.length
    let e = Math.ceil(end / PAGE_SIZE)
    let s = Math.ceil(param.start / PAGE_SIZE)
    delete param.start
    delete param.length
    for (let p = s + 1 ; p <= e; p++) {
        promiseArr.push(getFollowUpdate({...param, p}))
    }
    return (await Promise.all(promiseArr)).flat(1).slice(param.start, end)
}

/**
 * @param {FollowUpdateParam} param
 * @return {Promise<ResultPreviewDTO[]>}
 */
export async function getFollowUpdate(param) {
    const type = param.type
    delete param.type
    const data = await pixivJsonFetch('/ajax/follow_latest/' + type, param)
    const target = data.thumbnails[type]
    const results = []
    for (const single of target) {
        results.push({
            id: +(single.id),
            title: single.title,
            cover: replaceURL(single.url),
            tags: single.tags,
            createTime: new Date(single.createDate).getTime(),
            updateTime: new Date(single.updateDate).getTime(),
            restrict: single.xRestrict === 0 ? 'safe' : 'r18',
            total: single.pageCount,
            author: {
                name: single.userName,
                id: +(single.userId)
            }
        })
    }
    return results
}
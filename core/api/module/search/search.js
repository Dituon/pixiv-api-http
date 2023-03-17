import {pixivJsonFetch, replaceURL} from '../../../pixiv-fetch/index.js'
import config from '../../../../config.js'
import {fixParam} from "./no-premium.js";

/** @private @readonly */
const PAGE_SIZE = 60
const lang = config.pixiv.lang
const noPremium = !config.pixiv.premium

const defaultParams = {
    word: '',
    order: 'date_d',
    start: 0,
    length: PAGE_SIZE,
    blt: 0,
    s_mode: 's_tag',
    type: 'illust',
    mode: 'safe',
    lang
}

const templates = {
    top: {
        order: 'popular_male_d',
        blt: 0
    },
    default: {
        order: 'date_d',
        blt: 1000
    },
    enhance: {
        order: 'date_d',
        blt: 50
    }
}

const searchOrders = {
    date: 'date_d', popular: 'popular_male_d'
}

const searchModes = {
    tag: 's_tag', full: 's_tag_full', content: 's_tc'
}

/** @type {SearchTypeInfoMap} */
const searchTypes = {
    artwork: {path: 'artworks', type: 'all', name: 'illustManga'},
    illust: {path: 'illustrations', type: 'illust', name: 'illust'},
    gif: {path: 'illustrations', type: 'ugoira', name: 'illust'},
    illust_and_gif: {path: 'illustrations', type: 'illust_and_ugoira', name: 'illust'},
    manga: {path: 'manga', type: 'manga', name: 'manga'},
    novel: {path: 'novels', type: '', name: 'novel'}
}

/**
 * @param {SearchParam} param
 * @return {Promise<SearchResultDTO>}
 */
export async function searchFormat(param) {
    param = {...defaultParams, ...templates[param.template], ...param}
    param.order = searchOrders[param.order] ?? param.order
    param.s_mode = searchModes[param.mode] ?? param.mode
    param.mode = param.restrict ?? 'safe'
    const inf = searchTypes[param.type]
    param.type = inf?.type ?? param.type
    const path = inf?.path ?? 'illustrations'

    if (param.type === 'novel') param.work_lang = param.lang

    const promiseArr = []
    if (noPremium) {
        promiseArr.push(await fixParam(param, inf))
    } else if (param.p) {
        return search(path, inf.name, param)
    }

    param.start = +param.start
    param.length = +param.length
    let end = param.start + param.length
    let e = Math.ceil(end / PAGE_SIZE)
    let s = Math.ceil(param.start / PAGE_SIZE)
    // delete param.start
    // delete param.length
    for (let p = s + 1 + noPremium; p <= e; p++) {
        promiseArr.push(search(path, inf.name, {...param, p}))
    }
    const res = (await Promise.all(promiseArr)).reduce((result, pageData) => {
        result.results.push(...pageData.results)
        result.relatedTags = pageData.relatedTags
        result.total = pageData.total
        return result
    }, {
        results: [],
        relatedTags: [],
        total: 0
    })
    res.results = res.results.slice(param.start, end)
    return res
}

/**
 * @param {SearchPath} path
 * @param {string} dataName
 * @param {RawSearchParam} param
 * @return {Promise<SearchResultDTO>}
 */
export async function search(path, dataName, param) {
    // param = { ...defaultParams, ...templates[param.template], ...param }
    const data = await pixivJsonFetch(`/ajax/search/${path}/${encodeURIComponent(param.word)}`, param)
    const results = []
    for (const single of data[dataName].data) {
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
    return {
        results,
        relatedTags: data.relatedTags,
        total: data[dataName].total
    }
}
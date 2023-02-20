import { pixivJsonFetch } from '../../../pixiv-fetch/index.js'
import config from '../../../../config.js'
/** @typedef {import('../../../../config.js').Lang} Lang */

/**
 * @typedef {object} ResultPreviewDTO
 * @property {number} id
 * @property {string} title
 * @property {string} cover
 * @property {string[]} tags
 * @property {number} createTime
 * @property {number} updateTime
 * @property {AuthorDTO} author
 */

/**
 * @typedef {'date'|'popular'} SearchOrder
 * @typedef {'date_d'|'popular_male_d'} RawSearchOrder
 * 
 * @typedef {'tag'|'full'|'content'} SearchMode
 * @typedef {'s_tag'|'s_tag_full'|'s_tc'} RawSearchMode
 * 
 * @typedef {'artwork'|'illust'|'gif'|'illust_and_gif'|'manga'|'novel'} SearchType
 * @typedef {'all'|'illust'|'ugoira'|'illust_and_ugoira'|'manga'} RawSearchType
 * 
 * @typedef {'top'|'default'|'enhance'} TemplateType
 */

/**
 * @typedef {object} SearchParam
 * @property {string} word
 * @property {TemplateType} [template]
 * @property {SearchOrder} [order]
 * @property {number} [blt=0]
 * @property {SearchMode|RawSearchMode} [mode]
 * @property {SearchType|RawSearchType} [type]
 * @property {Restrict} [restrict='safe']
 * @property {number} [start=0]
 * @property {number} [length=60]
 * @property {number} [p=1]
 * @property {Lang} [lang]
 */

/** 
 * @typedef {object} RawSearchParam
 * @property {string} word
 * @property {RawSearchOrder} order
 * @property {number} blt
 * @property {RawSearchMode} s_mode
 * @property {RawSearchType} type
 * @property {Restrict} mode
 * @property {number} p
 * @property {Lang} lang
 */

/**
 * @typedef {object} SearchResultDTO
 * @property {ResultPreviewDTO[]} results
 * @property {number} total
 */

/** @private @readonly */
const PAGE_SIZE = 60
const lang = config.pixiv.lang
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
        blt: 2000
    },
    enhance: {
        order: 'date_d',
        blt: 50
    }
}

/** @type {object<SearchOrder, RawSearchOrder>} */
const searchOrders = {
    date: 'date_d', popular: 'popular_male_d'
}

/** @type {object<SearchMode, RawSearchMode>} */
const searchModes = {
    tag: 's_tag', full: 's_tag_full', content: 's_tc'
}

const searchTypes = {
    artworks: { path: 'artworks', type: 'all', name: 'illustManga' },
    illust: { path: 'illustrations', type: 'illust', name: 'illust' },
    gif: { path: 'illustrations', type: 'ugoira', name: 'illust' },
    illust_and_gif: { path: 'illustrations', type: 'illust_and_ugoira', name: 'illust' },
    manga: { path: 'manga', type: 'manga', name: 'manga' },
    novel: { path: 'novels', type: '', name: 'novel' }
}

/**
 * @param {SearchParam} param
 * @return {Promise<SearchResultDTO>}
 */
export async function searchFormat(param) {
    param = { ...defaultParams, ...templates[param.template], ...param }
    param.order = searchOrders[param.order] ?? param.order
    param.s_mode = searchModes[param.mode] ?? param.mode
    param.mode = param.restrict ?? 'safe'
    const inf = searchTypes[param.type]
    param.type = inf?.type ?? param.type
    const path = inf?.path ?? 'illustrations'

    if (param.type === 'novel') param.work_lang = param.lang

    if (param.p) return search(path, inf.name, param)

    let end = param.start + param.length
    let e = Math.ceil(end / PAGE_SIZE)
    let s = Math.ceil(param.start / PAGE_SIZE)
    // delete param.start
    // delete param.length
    const promiseArr = []
    for (let p = s + 1; p <= e; p++) {
        promiseArr.push(search(path, inf.name, { ...param, p }))
    }
    const res = (await Promise.all(promiseArr)).reduce((result, pageData) => {
        result.results.push(...pageData.results)
        result.total = pageData.total
        return result
    }, {
        results: [],
        total: 0
    })
    res.results = res.results.slice(param.start, end)
    return res
}

/**
 * @param {'illustrations'|'artworks'|'manga'|'novels'} path
 * @param {RawSearchParam} param
 * @return {Promise<SearchResultDTO>}
 */
export async function search(path, dataName, param) {
    // param = { ...defaultParams, ...templates[param.template], ...param }
    const data = await pixivJsonFetch(`/ajax/search/${path}/${encodeURIComponent(param.word)}?${new URLSearchParams(param).toString()}`)
    const results = []
    for (const single of data[dataName].data) {
        results.push({
            id: parseInt(single.id),
            title: single.title,
            cover: single.url,
            tags: single.tags,
            cerateTime: new Date(single.createDate).getTime(),
            updateTime: new Date(single.updateDate).getTime(),
            author: {
                name: single.userName,
                id: parseInt(single.userId)
            }
        })
    }
    return {
        results,
        total: data[dataName].total
    }
}
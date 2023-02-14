import { pixivJsonFetch } from '../../../pixiv-fetch/index.js'
import config from '../../../../config.js'
/** @typedef {import('../../../../config.js').Lang} Lang */

/**
 * @typedef {object} IllustPreviewDTO
 * @property {number} id
 * @property {string} title
 * @property {string} preview
 * @property {string[]} tags
 * @property {number} time
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
 * @property {IllustPreviewDTO[]} illusts
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
        blt: 100
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
    artworks: {path: 'artworks', type: 'all'},
    illust: {path: 'illustrations', type: 'illust'},
    gif: {path: 'illustrations', type: 'ugoira'},
    illust_and_gif: {path: 'illustrations', type: 'illust_and_ugoira'},
    manga: {path:'manga', type:'manga'},
    novel: {path: 'novels', type: ''}
}

/**
 * @param {SearchParam} param
 * @return {Promise<SearchResultDTO>}
 */
export async function searchFormat(param) {
    param = { ...defaultParams, ...templates[param.template], ...param }
    param.order = searchOrders[param.order] ?? param.order
    param.s_mode = searchModes[param.mode] ?? param.mode
    param.mode = param.restrict
    inf = searchTypes[param.type]
    param.type = inf?.type ?? param.type
    path = inf?.path ?? 'illustrations'

    if (param.p) return search(path, param)

    let end = param.start + param.length
    let e = Math.ceil(end / PAGE_SIZE)
    let s = Math.ceil(param.start / PAGE_SIZE)
    const promiseArr = []
    for (let p = s; p < e; p++) {
        promiseArr.push(search(path, { ...param, p }))
    }
    const res = (await Promise.all(promiseArr)).reduce((result, pageData) => {
        result.illusts.push(...pageData.illusts)
        result.total = pageData.total
    }, {
        illusts: [],
        total: 0
    })
    res.illusts = res.illusts.slice(param.start, end)
    return res
}

/**
 * @param {'illustrations'|'artworks'|'manga'|'novels'} path
 * @param {RawSearchParam} param
 * @return {Promise<SearchResultDTO>}
 */
export async function search(path, param) {
    // param = { ...defaultParams, ...templates[param.template], ...param }
    const data = await pixivJsonFetch(`/ajax/search/${path}/${param.word}?${Object.entries(param).reduce((str, item) => str += `&${item[0]}=${item[1]}`)}`)
    const illusts = []
    for (const single of data.illustManga.data) {
        illusts.push({
            id: parseInt(single.id),
            title: single.title,
            preview: single.url,
            tags: single.tags,
            time: new Date(single.updateDate).getSeconds(),
            author: {
                name: parseInt(single.userName),
                id: single.userId
            }
        })
    }
    return {
        illusts,
        total: data.illustManga.total
    }
}
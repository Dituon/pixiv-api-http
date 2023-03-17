// 插画: illustrations -> type: illust_and_ugoira
// 漫画: manga -> type: manga
// 插画和漫画: artworks -> type: all
// 小说: novels -> notype, work_lang: lang

/** @typedef {'date'|'popular'} SearchOrder */
/** @typedef {'date_d'|'popular_male_d'} RawSearchOrder */

/** @typedef {'tag'|'full'|'content'} SearchMode */
/** @typedef {'s_tag'|'s_tag_full'|'s_tc'} RawSearchMode */

/** @typedef {'all'|'illust'|'ugoira'|'illust_and_ugoira'|'manga'} RawSearchType */

/** @typedef {'top'|'default'|'enhance'} TemplateType */

/** @typedef {Object<WorkType, SearchTypeInfo>} SearchTypeInfoMap */
/** @typedef {{path: SearchPath, type: RawSearchType | '', name: string}} SearchTypeInfo */
/** @typedef {'illustrations'|'artworks'|'manga'|'novels'} SearchPath */

/**
 * @typedef {object} SearchParam
 * @property {string} word
 * @property {TemplateType} [template]
 * @property {SearchOrder} [order]
 * @property {number} [blt=0]
 * @property {SearchMode|RawSearchMode} [mode]
 * @property {WorkType|RawSearchType} [type]
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
 * @property {string[]} relatedTags
 * @property {number} total
 */

export {search, searchFormat} from './search.js'
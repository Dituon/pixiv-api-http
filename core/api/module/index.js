/** @typedef {import('../../../../config.js').Lang} Lang */

/**
 * @typedef {object} BaseItemInfoDTO
 * 
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {number} createTime create timestamp
 * @property {number} updateTime update timestamp
 * @property {string[]} tags
 * @property {Restrict} restrict
 * @property {number} bookmarkCount ❤ icon
 * @property {number} likeCount 😊 icon
 * @property {number} viewCount 👁 icon
 */

/**
 * @typedef {object} BaseItemServiceInfoDTO
 * 
 * @property {number} id
 * @property {string} title
 * @property {number} order
 * @property {BaseItemHeadInfoDTO} prev
 * @property {BaseItemHeadInfoDTO} next
 */

/** @typedef {{id: number, title: string}} BaseItemHeadInfoDTO */

/** 
 * @typedef {'all'|'safe'|'r18'} Restrict 
 * @typedef { {name: string, id: number} } AuthorDTO
 */

/**
 * @typedef {object} ResultPreviewDTO
 * @property {number} id
 * @property {string} title
 * @property {string} cover
 * @property {string[]} tags
 * @property {number} createTime
 * @property {number} updateTime
 * @property {Restrict} restrict
 * @property {number} total
 * @property {AuthorDTO} author
 */

/**
 * @typedef {ResultPreviewDTO} BaseRecommendDTO
 */

/** @typedef {'artwork'|'illust'|'gif'|'illust_and_gif'|'manga'|'novel'} WorkType */
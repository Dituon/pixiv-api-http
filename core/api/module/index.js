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
 * @typedef {ResultPreviewDTO} BaseRecommendDTO
 */
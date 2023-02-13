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
 * @typedef {'all'|'safe'|'r18'} Restrict 
 * @typedef { {name: string, id: number} } AuthorDTO
 */
import { pixivJsonFetch } from "../../../pixiv-fetch/index.js";
/** @typedef {import('../../../../config.js').Lang} Lang */

/** 
 * @typedef {object} NovelSeriesDTO
 * @property {number} id
 * @property {string} title
 * @property {string} comment
 * @property {string[]} tags
 * @property {string} lang
 * @property {string} cover
 * @property {string} restrict
 * @property {boolean} concluded
 * @property {number} total
 * @property {number} charCount
 * @property {number} wordCount
 * @property {number} readingTime
 * @property {number} createTime
 * @property {number} updateTime
 * @property {object} author
 * @property {string} author.name
 * @property {number} author.id
 */

/**
 * @param {number} id 
 * @return {Promise<NovelSeriesDTO>}
 */
export async function getPidSeries(id){
    const novel = await pixivJsonFetch('/ajax/novel/series/' + id)
    return {
        id: parseInt(novel.id),
        title: novel.title,
        comment: novel.caption,
        tags: novel.tags,
        lang: novel.language,
        cover: novel.cover.urls.original,
        restrict: novel.xRestrict == 0 ? 'safe' : 'r18',

        concluded: novel.isConcluded,
        total: novel.publishedContentCount,
        charCount: novel.publishedTotalCharacterCount,
        wordCount: novel.publishedTotalWordCount,
        readingTime: novel.publishedReadingTime,
        createTime: novel.createdTimestamp,
        updateTime: novel.updatedTimestamp,

        author: {
            name: novel.userName,
            id: parseInt(novel.userId)
        }
    }
}
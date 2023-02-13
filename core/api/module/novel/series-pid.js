import { pixivJsonFetch } from "../../../pixiv-fetch/index.js";
/** @typedef {import('../../../../config.js').Lang} Lang */
/** @typedef {import('../illust/pid.js').AuthorDTO} AuthorDTO */
/** @typedef {import('./pid.js').NovelInfoDTO} NovelInfoDTO */

/** 
 * @typedef {NovelInfoDTO & {
 *     total: number,
 *     concluded: boolean
 * }} NovelSeriesInfoDTO
 */

/**
 * @param {number} id 
 * @return {Promise<NovelSeriesInfoDTO>}
 */
export async function getPidNovelSeriesInfo(id){
    const series = await pixivJsonFetch('/ajax/novel/series/' + id)
    return {
        id,
        title: series.title,
        description: series.caption,
        tags: series.tags,
        lang: series.language,
        cover: series.cover.urls.original,
        restrict: series.xRestrict == 0 ? 'safe' : 'r18',

        concluded: series.isConcluded,
        total: series.publishedContentCount,
        charCount: series.publishedTotalCharacterCount,
        wordCount: series.publishedTotalWordCount,
        readingTime: series.publishedReadingTime,
        createTime: series.createdTimestamp,
        updateTime: series.updatedTimestamp,

        author: {
            name: series.userName,
            id: parseInt(series.userId)
        }
    }
}
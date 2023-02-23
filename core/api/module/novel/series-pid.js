import { pixivJsonFetch, replaceURL } from "../../../pixiv-fetch/index.js";
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
export async function getPidNovelSeriesInfo(id) {
    const series = await pixivJsonFetch('/ajax/novel/series/' + id)
    return {
        id: parseInt(id),
        title: series.title,
        description: series.caption,
        tags: series.tags,
        lang: series.language,
        cover: replaceURL(series.cover.urls.original),
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

/**
 * @param {number} id 
 */
export async function getPidNovelSeriesContent(id) {
    const { thumbnails } = await pixivJsonFetch('/ajax/novel/series_content/' + id, {
        limit: 30,
        last_order: 0,
        order_by: 'asc'
    })
    const resultArr = []
    for (const singleNovel of thumbnails.novel) {
        resultArr.push({
            id: parseInt(singleNovel.id),
            title: singleNovel.title,
            description: singleNovel.description,
            tags: singleNovel.tags,
            restrict: singleNovel.xRestrict == 0 ? 'safe' : 'r18',
            charCount: singleNovel.characterCount,
            wordCount: singleNovel.wordCount,
            readingTime: singleNovel.readingTime * 1000,
            createTime: new Date(singleNovel.createDate).getTime(),
            updateTime: new Date(singleNovel.updateDate).getTime(),
            bookmarkCount: singleNovel.bookmarkCount,
            author: {
                name: singleNovel.userName,
                id: parseInt(singleNovel.userId)
            }
        })
    }
    return resultArr
}

export default async function getPidNovelSeries(id) {
    const result = await Promise.all([
        getPidNovelSeriesInfo(id),
        getPidNovelSeriesContent(id)
    ])
    return {
        ...result[0],
        novels: result[1]
    }
}
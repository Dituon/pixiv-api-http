import { pixivJsonFetch } from "../../../pixiv-fetch/index.js";
/** @typedef {import('../../../../config.js').Lang} Lang */

/** @typedef {{id: number, title: string}} BaseNovelInfoDTO */

/** 
 * @typedef {BaseItemInfoDTO & {
 *     lang: Lang,
 *     cover: string,
 *     restrict: Restrict,
 *     charCount: number,
 *     wordCount: number,
 *     readingTime: number
 * }} NovelInfoDTO
 */

/**
 * @typedef {NovelInfoDTO & {
 *     content: string,
 *     series: BaseNovelInfoDTO & {
 *         order: number,
 *         prev: BaseNovelInfoDTO,
 *         next: BaseNovelInfoDTO
 *     }
 * }} NovelItemDTO 
 */

export async function getPidNovel(id) {
    const novel = await pixivJsonFetch('/touch/ajax/novel/details?novel_id=' + id)
    const details = novel.novel_details
    const series = details.series
    return {
        id: parseInt(id),
        title: details.title,
        description: details.comment,
        tags: details.tags,
        lang: details.language,
        restrict: details.x_restrict == 0 ? 'safe' : 'r18',
        charCount: parseInt(details.character_count),
        wordCount: details.word_count,
        readingTime: details.reading_time,
        createTime: details.create_time,
        updateTime: details.update_time,
        bookmarkCount: details.bookmark_count,
        likeCount: parseInt(details.rating_count),
        viewCount: parseInt(details.rating_view),

        cover: details.url,
        series: !series ? null : {
            id: parseInt(series.id),
            title: series.title,
            order: series.order,
            prev: {
                id: series.prev_novel.id,
                title: series.prev_novel.title
            },
            next: {
                id: series.next_novel.id,
                title: series.next_novel.title
            }
        },
        author: {
            id: parseInt(details.user_id),
            name: details.user_name
        },
        content: details.text
    }
}

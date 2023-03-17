import { pixivJsonFetch, replaceURL } from "../../../pixiv-fetch/index.js";
/** @typedef {import('../../../../config.js').Lang} Lang */

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
 *     series: BaseItemServiceInfoDTO
 * }} NovelItemDTO 
 */

export async function getPidNovel(id) {
    const novel = await pixivJsonFetch('/touch/ajax/novel/details?novel_id=' + id)
    const details = novel.novel_details
    const series = details.series
    return {
        id: +(id),
        title: details.title,
        description: details.comment,
        tags: details.tags,
        lang: details.language,
        restrict: details.x_restrict == 0 ? 'safe' : 'r18',
        charCount: +(details.character_count),
        wordCount: details.word_count,
        readingTime: details.reading_time,
        createTime: details.create_time,
        updateTime: details.update_time,
        bookmarkCount: details.bookmark_count,
        likeCount: +(details.rating_count),
        viewCount: +(details.rating_view),

        cover: replaceURL(details.url),
        series: !series ? null : {
            id: +(series.id),
            title: series.title,
            order: series.content_order,
            prev: !series.prev_novel ? null : {
                id: series.prev_novel.id,
                title: series.prev_novel.title
            },
            next: !series.next_novel ? null : {
                id: series.next_novel.id,
                title: series.next_novel.title
            }
        },
        author: {
            id: +(details.user_id),
            name: details.user_name
        },
        content: details.text
    }
}

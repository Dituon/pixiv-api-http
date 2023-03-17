import { pixivJsonFetch } from "../../../pixiv-fetch/index.js"
import { getBaseIllustDTO } from "../illust/pid.js"
/** @typedef { import('../illust/pid.js').IllustDTO } IllustDTO */

/**
 * @typedef {IllustDTO & { 
 *     series: BaseItemServiceInfoDTO
 * }} MangaDTO
 */

/**
 * @param {number} id
 * @return {Promise<MangaDTO>}
 */
export async function getPidManga(id) {
    const illust = await pixivJsonFetch(
        '/touch/ajax/illust/details?illust_id=' + id
    )
    const series = illust.illust_details.series
    return {
        ...getBaseIllustDTO(illust.illust_details),
        series: !series ? null : {
            id: +(series.id),
            title: series.title,
            order: +(series.content_order),
            prev: !series.prev_illust ? null : {
                id: series.prev_illust.illust_id,
                title: series.prev_illust.illust_title
            },
            next: !series.next_illust ? null :  {
                id: series.next_illust.illust_id,
                title: series.next_illust.illust_title
            }
        }
    }
}
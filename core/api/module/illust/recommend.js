/**
 * @typedef {BaseRecommendDTO & {type: string}} IllustRecommendDTO
 */

import {pixivJsonFetch} from "../../../pixiv-fetch/index.js";
import replaceUrl from "../../../pixiv-fetch/replace-url.js";

/**
 * @param {number} id
 * @param {number} [size=20]
 * @return {Promise<IllustRecommendDTO[]>}
 */
export async function getPidRecommend(id, size = 20) {
    const data = await pixivJsonFetch(`/ajax/illust/${id}/recommend/init?limit=${size}`)
    /** @type {IllustRecommendDTO[]} */
    const list = []
    let len = data.illusts.length
    for (let i = 0; i < len; i++) {
        const single = data.illusts[i]
        if (!single.id) continue
        list.push({
            id: parseInt(single.id),
            title: single.title,
            type: single.type,
            tags: single.tags,
            cover: replaceUrl(single.url),
            restrict: single.xRestrict === 0 ? 'safe' : 'r18',
            createTime: new Date(single.createDate).getTime(),
            updateTime: new Date(single.updateDate).getTime(),
            total: single.pageCount,
            author: {
                id: parseInt(single.userId),
                name: single.userName
            }
        })
    }
    return list
}

export async function getPidRecommendIds(id, size = 20) {
    const data = await pixivJsonFetch(`/ajax/illust/${id}/recommend/init?limit=${size}`)
    return data.nextIds.slice(0, size).map(i => parseInt(i))
}
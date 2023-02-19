import { pixivJsonFetch } from '../../../pixiv-fetch/index.js'

/** 
 * @typedef {BaseItemInfoDTO & {
 *     total: number,
 *     images: ImageDTO[]
 * }} IllustDTO
 */

/** 
 * @typedef {object} ImageDTO
 * 
 * @property {object} urls
 * @property {string} urls.small
 * @property {string} urls.regular
 * @property {string} urls.original
 * @property {number} width
 * @property {number} height
 */

/**
 * @param {number} id
 * @return {Promise<IllustDTO>}
 */
export async function getPidIllust(id) {
    const illust = await pixivJsonFetch(
        '/touch/ajax/illust/details?illust_id=' + id
    )
    return getBaseIllustDTO(illust.illust_details)
}

/**
 * @param {number} id
 * @return {Promise<ImageDTO[]>}
 */
export async function getPidImageList(id) {
    return await pixivJsonFetch(
        `/ajax/illust/${id}/pages`
    )
}

/**
 * @param {number} id
 * @param {number} page index + 1 of illust
 * @return {Promise<ImageDTO>}
 */
export async function getPidImage(id, page) {
    const imgs = await getPidImageList(id)
    try {
        return imgs[page - 1]
    } catch {
        throw new RangeError(`no page ${page} in illust ${id}`)
    }
}

/** @return {IllustDTO} */
export function getBaseIllustDTO(details) {
    const authorDetails = details.author_details
    const pages = parseInt(details.page_count)
    /** @type { ImageDTO[] } */
    const images = []
    if (pages === 1) {
        images.push({
            urls: {
                small: details.url_s,
                regular: details.url,
                original: details.url_big
            },
            width: parseInt(details.illust_images[0].illust_image_width),
            height: parseInt(details.illust_images[0].illust_image_height)
        })
    } else {
        for (let i = 0; i < pages; i++) {
            const {
                illust_image_width: width,
                illust_image_height: height
            } = details.illust_images[i]
            const {
                url: regular,
                url_small: small,
                url_big: original
            } = details.manga_a[i]
            images.push({ urls: { small, regular, original }, width, height })
        }
    }
    return {
        id: parseInt(details.id),
        title: details.title,
        total: pages,
        images,
        createTime: details.create_timestamp ?? details.upload_timestamp,
        updateTime: details.upload_timestamp,
        tags: details.tags,
        restrict: details.x_restrict == 0 ? 'safe' : 'r18',
        description: details.comment,
        bookmarkCount: details.bookmark_user_total,
        likeCount: parseInt(details.rating_count),
        viewCount: parseInt(details.rating_view),
        author: {
            name: authorDetails.user_name,
            id: parseInt(authorDetails.user_id)
        }
    }
}
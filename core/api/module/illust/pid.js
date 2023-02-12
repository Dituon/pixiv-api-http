import { pixivJsonFetch } from '../../../pixiv-fetch/index.js'

/** 
 * @typedef {object} IllustDTO
 * 
 * @property {string} title
 * @property {number} pages page count
 * @property {ImageDTO[]} images
 * @property {number} time update timestamp
 * @property {string[]} tags
 * @property {string} comment
 * @property {number} bookmarks ❤ icon
 * @property {number} likes 😊 icon
 * @property {number} views 👁 icon
 */

/**
 * @typedef { {name: string, id: number} } AuthorDTO
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
    const details = illust.illust_details
    const pages = parseInt(details.page_count)
    /** @type { ImageDTO[] } */
    const images = []
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
    const authorDetails = details.author_details
    return {
        title: details.title,
        pages,
        images,
        time: details.upload_timestamp,
        tags: details.tags,
        comment: details.comment,
        bookmarks: details.bookmark_user_total,
        likes: parseInt(details.rating_count),
        views: parseInt(details.rating_view),
        author: {
            name: authorDetails.user_name,
            id: parseInt(authorDetails.user_id)
        }
    }
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

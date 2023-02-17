import https from 'https'
import url from 'url'
import defaultOption from "./default-option.js"

/** 
 * @param { https.RequestOptions | string } option
 * @return { Promise<string> }
 */
export default async function pixivFetch(option) {
    if (typeof option === 'string') {
        const u = url.parse(option)
        option = {
            host: u.host,
            path: u.pathname || '/' + u.search || ''
        }
    }
    const connectOption = { ...defaultOption, ...option }
    return new Promise((res, rej) => {
        const request = https.request(connectOption, (response) => {
            let data = []
            response.on('data', chunk => data.push(chunk))
            response.on('end', () => res(Buffer.concat(data).toString()))
        })
        request.on('error', rej)
        request.end()
    })
}

/**
 * www.pixiv.net + $path
 * @param {string} path
 * @return { Promise<object> }
 */
export async function pixivJsonFetch(path, query) {
    if (query) path += '?' + new URLSearchParams(query).toString()
    const json = await pixivFetch({path}).then(JSON.parse)
    if (json.error) throw new Error(json.message)
    return json.body
}
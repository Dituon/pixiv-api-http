import http from 'http'
import config from "../../config.js"

export const rawHost = 'i.pximg.net'
export const rawURL = 'https://' + rawHost

const useOriginIP = config.proxy.useOriginIP
const useLocalProxy = config.proxy.useLocalProxy

export const localProxyURL = `http://${config.httpServer.host}:${config.httpServer.port}/proxy`
export let imageServerOriginURL = 'http://' + config.proxy.imageHost[0]
export let imageServerHost = config.proxy.imageHost[0]

/**
 * @param {string} url
 * @return {string}
 */
export default !(useOriginIP || useLocalProxy) ?
    url => url : (useLocalProxy ?
            url => url.replace(rawURL, localProxyURL) :
            url => url.replace(rawURL, imageServerOriginURL)
    )

if (useOriginIP) {
    for (const hostIp of config.proxy.imageHost) {
        const {status, ip} = await new Promise((res, rej) => {
            const request = http.get(
                'http://' + hostIp,
                r => res({status: r.statusCode, ip: hostIp})
            )

            request.on('error', rej)
            request.end()
        }).catch(err => {
            throw new Error(err, 'can not connect image server, retrying...')
        })

        if (status !== 200 && status !== 304) continue

        console.log('image server connect success, server ip: %s', ip)
        imageServerOriginURL = 'http://' + ip
        imageServerHost = ip
        break
    }
}
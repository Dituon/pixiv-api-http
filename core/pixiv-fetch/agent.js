import https from 'https'
import config from "../../config.js"
import baseOpiton from './base-option.js'

const bypassSNI = config.proxy.bypassSNI

export const staticAgent = ip => new https.Agent({
    rejectUnauthorized: true,
    servername: '',
    lookup: (_0, _1, callback) => callback(null, ip, 4)
})

export let agent = !bypassSNI ?
    https.globalAgent : staticAgent(config.proxy.serverHost[0])

if (bypassSNI) { //test ip
    for (const hostIp of config.proxy.serverHost) {
        const { status, ip } = await new Promise((res, rej) => {
            const request = https.request({
                ...baseOpiton,
                agent: staticAgent(hostIp)
            }, r => res({ status: r.statusCode, ip: hostIp }))

            request.on('error', rej)
            request.end()
        }).catch(err => {
            throw new Error(err, 'can not connect pixiv server, retrying...')
        })

        if (status !== 200) continue

        console.log('pixiv connect success, server ip: %s', ip)
        agent = staticAgent(ip)
        break
    }
}

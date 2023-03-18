import config from "../../../../config.js"
import {getFollowUpdate} from "./follow.js"
import fs from "fs"
import {WebSocketServer} from "ws"

export const CACHE_FILE_NAME = 'follow-update-cache.json'

export function initFollowUpdatePush() {
    const wss = new WebSocketServer({
        host: config.websocketServer.host,
        port: config.websocketServer.port,
        path: '/follow-update'
    })

    const cachePath = config.pixiv.cachePath;
    const file = cachePath + CACHE_FILE_NAME

    fs.mkdirSync(cachePath, {recursive: true})

    const proxyData = new Proxy(
        fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf-8')) : {
            illust: 0,
            novel: 0
        },
        {
            set(target, key, value) {
                target[key] = value
                clearTimeout(this.timer)
                this.timer = setTimeout(
                    () => fs.writeFile(file, JSON.stringify(target), console.warn),
                    5000
                )
                return true
            }
        }
    )

    /** @param {ResultPreviewDTO[]} data */
    const pushUpdate = data => {
        for (const client of wss.clients) {
            if (client.readyState !== WebSocket.OPEN) continue
            client.send(JSON.stringify(data))
        }
    }

    const cacheData = async type => {
        const p = 1
        const data = await getFollowUpdate({p, type, mode: 'all'})
        const lastId = proxyData[type]
        const index = data.findIndex(item => item.id === lastId)
        pushUpdate(data.slice(0, index))
        proxyData[type] = data[0].id
    }

    setInterval(() => {
        cacheData('illust')
        cacheData('novel')
    }, config.pixiv.followUpdate.interval)

    setImmediate(() => {
        cacheData('illust')
        cacheData('novel')
    })
}

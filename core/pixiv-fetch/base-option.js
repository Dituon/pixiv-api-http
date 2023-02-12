import config from '../../config.js'
const cookie = config.pixiv.cookie

export default {
    host: 'www.pixiv.net',
    port: 443,
    path: '/',
    method: 'GET',
    headers: {
        'Referer': 'https://www.pixiv.net',
        'Cookie': cookie
    }
}
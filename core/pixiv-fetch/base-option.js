import config from '../../config.js'
const cookie = config.pixiv.cookie

export default {
    host: 'www.pixiv.net',
    port: 443,
    path: '/',
    method: 'GET',
    headers: {
        'Referer': 'https://www.pixiv.net',
        'Cookie': cookie,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.41'
    }
}
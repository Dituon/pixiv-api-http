const config = {
    // Proxy setting
    // 代理设置
    proxy: {

        // bypass government SNI blocking (for China, Korea, Iran etc.)
        // 绕过防火墙的SNI封锁 (如天朝, 韩国, 伊朗等)
        bypassSNI: true,
        // query dns records, by www.nslookup.io
        serverHost: [ // *.pixiv.net
            '210.140.92.183',
            '210.140.92.187',
            '210.140.92.193',
            '210.140.131.226',
            '210.140.131.223',
            '210.140.131.218',
            '210.140.131.199',
            '210.140.131.201'
        ],

        // replace img url to original ip, improve access speed
        // 替换图片链接为原始IP, 可在墙内通过原始IP获取图片, 使用http连接加快访问速度
        useOriginIP: true,
        // replace img url to local proxy
        // 启动图片代理服务器 (host/proxy), 替换图片链接为本机代理
        useLocalProxy: true,
        imageHost: [ // i.pximg.net, direct connection by ip available
            '210.140.92.141',
            '210.140.92.149',
            '210.140.92.142',
            '210.140.92.148',
            '210.140.92.146',
            '210.140.92.144',
            '210.140.92.147',
            '210.140.92.145',
            '210.140.92.143'
        ]
    },
    
    pixiv: {
        /** @typedef {'ja'|'en'|'zh'|'zh-cn'|'zh-tw'} Lang */
        /** @type {Lang} */
        lang: 'zh',

        // your cookie here (see README.md#Tips)
        // 你的 Cookie (参考 README.md#Tips)
        cookie: '',

        premium: true,

        followUpdate: {
            // If undefined, the cookie will determine if it is enabled or not.
            // 如果为undefined, 则根据cookie判断是否启用
            enable: undefined,
            interval: 300 * 1000
        },

        cachePath: './cache/'
    }, 

    httpServer: {
        host: '127.0.0.1',
        port: 1145
    },

    websocketServer: {
        host: undefined,
        port: 4514
    }
}

if (config.pixiv.followUpdate.enable === undefined) {
    config.pixiv.followUpdate.enable = !!config.pixiv.cookie
}

if (config.websocketServer.host === undefined) {
    config.websocketServer.host = config.httpServer.host
}

export default config

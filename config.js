export default {
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
        // 替换图片链接为原始IP, 可在墙内通过原始IP获取图片
        useOriginIP: true,
        imgBedHost: [ // i.pximg.net, direct connection by ip available
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
        /** @type {Lang} */
        lang: 'zh',

        // your cookie here (use `document.cookie` to get cookie in `www.pixiv.net` console)
        // 你的 Cookie (在 `www.pixiv.net` 控制台使用 `document.cookie` 获取)
        cookie: ''

    }
}

/** @typedef {'jp'|'zh'|'en'} Lang */
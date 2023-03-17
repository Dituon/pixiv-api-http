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
        /** @type {Lang} */
        lang: 'zh',

        // your cookie here (use `document.cookie` to get cookie in `www.pixiv.net` console)
        // 你的 Cookie (在 `www.pixiv.net` 控制台使用 `document.cookie` 获取)
        cookie: 'first_visit_datetime_pc=2022-08-22+22:04:23; p_ab_id=2; p_ab_id_2=9; p_ab_d_id=365939164; yuid_b=KEJgFWM; privacy_policy_agreement=5; privacy_policy_notification=0; a_type=0; b_type=1; d_type=1; login_ever=yes; _gcl_au=1.1.1942574581.1671532878; c_type=23; PHPSESSID=42975336_x9QmAIKou0IExnoYIMqI9F99oWtjoDgT; gaCookie=GA1.2.70280954.1676604261; _ga_FK2WZ6VGPE=GS1.1.1676604261.1.0.1676604280.0.0.0; _ga_MZ1NL4PHH0=GS1.1.1676977118.2.0.1676977123.0.0.0; QSI_S_ZN_5hF4My7Ad6VNNAi=v:0:0; tag_view_ranking=0xsDLqCEW6~zIv0cf5VVk~qWFESUmfEs~m3EJRa33xU~RTJMXD26Ak~_hSAdpN9rx~LVSDGaCAdn~Lt-oEicbBr~QL2G1t5h_V~_EOd7bsGyl~EZQqoW9r8g~0RGtdYkK6L~-jxw_sxnha~XpYOJt3r5W~HmbNGlYoI9~wXrqjf59ua~2-q1CV6LVL~QKeXYK2oSR~gCB7z_XWkp~jH0uD88V6F~-j6y3lvVJ_~LLyDB5xskQ~3z6oPthwCe~ivqEf1CnFu~Ce-EdaHA-3~Hry6GxyqEm~aKhT3n4RHZ~Ie2c51_4Sp~edF4CoWy9T~_giyO1uU9O~KN7uxuR89w~EUwzYuPRbU~HY55MqmzzQ~BSlt10mdnm~Is0SiXyaWb~vc6Igd5WOM~TBAh5YDdLW~tqET_s-wOE~wvG5Sk7fMM~6HUSQEiWHT~y8GNntYHsi~05XvkINl3k~iFcW6hPGPU~abNIEh2zTB~gQ9f732ax3~VMrBpQAvH4~tTvZK72fmv~BEa426Zwwo~_pwIgrV8TB~h7fLeUgfMX~5oPIfUbtd6~bz_fJqhn6Z~Bd2L9ZBE8q~rqvM6GS14_~Q959js6mBM~1GBicHu4Rs~ziiAzr_h04~D0nMcn6oGk~Ged1jLxcdL~DD0L3VohGi~-98s6o2-Rp~2R7RYffVfj~qEsMl4UVLQ~jnGramvGBf~HNc_B2rklQ~liM64qjhwQ~b_rY80S-DW~lPWnqPImPM~e9EFq9kkOU~a_uBhkuszM~ETjPkL0e6r~y1woTGh4zh~w8ffkPoJ_S~LJo91uBPz4~emE8W9nsA-~6fOoWmKgJo~i8u6Dgt7ao~CrFcrMFJzz~aOGQhsapNP~1UjXdhlbzD~0wp7l-ZB5O~Cr3jSW1VoH~_Cyn4Nh0Pz~K36VCtGwMe~7CgWVIoK6s~nqXiFPp5zI~1F9SMtTyiX~DvpBcdQm5q~K8esoIs2eW~ETJyKjUU1f~dqqWNpq7ul~h9fEA3tOFb~ehFkU8vOq9~OoX00NrS_K~KMpT0re7Sq~mLrrjwTHBm~0JH8zGLi0k~yoNtdfRVvk~0jyux9PxkH~vCoMIEG5BM; _gid=GA1.2.1240402498.1678875547; _ga_75BBYNYN9J=GS1.1.1678958206.65.1.1678958377.0.0.0; _ga=GA1.2.12502285.1662014257; __cf_bm=sRlA.7e6G3l.ZsH0xD1q.mkYGppeRat7Na1rqYsEhks-1678962101-0-ATekii81460qguwkjTAenq2+gb7UttzrVwEVlSnj1v5uGPYtcn+ChqTykzA1clce5jgSRabPaypI26Ny0UmGO5j6m5/ASXghOcCEz/Bc+miD',

        premium: true
    }, 

    server: {
        host: '127.0.0.1',
        port: 1145
    }
}

/** @typedef {'ja'|'en'|'zh'|'zh-cn'|'zh-tw'} Lang */
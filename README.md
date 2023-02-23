# pixiv-api-http

## Intro

施工中, 此API旨在为pixiv开发者提供终极解决方案

可选: 

- 绕过政府防火墙SNI封锁
- 使用图床原始IP地址

## API

- [Illust](./core/api/module/illust/README.md)
- [Manga](core/api/module/manga/README.md)
- [Novel](./core/api/module/novel/README.md)
- [Search](./core/api/module/search/README.md)

## Deploy

0. install `node.js`
1. `git clone` `npm i`
2. 浏览器登录 `pixiv.net`, 控制台输入 `document.cookie` 获取 `cookie`
3. 编辑 `config.js`
4. `npm start`

## Tips

- 部分功能设置`cookie`后可用
- 部分功能需要Pixiv会员账户, 非会员搜索优化请参考 [工作方式](./HowToWork.md)
- 设置 `Headers: Referer` 为 `https://www.pixiv.net/` 即可直接访问图片

## TODO

- manga-series
- gif
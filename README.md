# pixiv-api-http

## Intro

此API旨在为 Pixiv 开发者提供终极解决方案

可直接访问 Pixiv, 绕过防火墙封锁 (如 天朝 伊朗 等)

**[工作原理](HowToWork.md)**

可选:

- 绕过政府防火墙封锁
- 使用图床原始IP地址
- 非会员搜索优化
- 本地图片反向代理

## API

- [Illust](./core/api/module/illust/README.md)
- [Manga](core/api/module/manga/README.md)
- [Novel](./core/api/module/novel/README.md)
- [Search](./core/api/module/search/README.md)

## Config

配置文件 `config.js`

### `proxy`

代理设置

**应用服务器 (`www.pixiv.net` `*.pixiv.net`)**

- `bypassSNI` (boolean): 绕过防火墙的SNI封锁 (如天朝, 韩国, 伊朗等)
- `serverHost` (IP[]): 服务器原始IP, 用于绕过DNS欺骗

**图片服务器 (`i.pximg.net`)**

- `useOriginIP` (boolean): 替换图片链接为图床原始IP, 可在墙内通过原始IP获取图片, 使用http连接加快访问速度
- `useLocalProxy` (boolean): 启动代理服务器, 替换图片链接为本机代理, 免去Referer设置
- `imageHost` (IP[]): 图片服务器原始IP, 用于绕过DNS欺骗

| **`useOriginIP`** | **`useLocalProxy`** | **行为**                                  |
|-------------------|---------------------|-----------------------------------------|
| `false`           | `false`             | 返回原始链接                                  |
| `true`            | `false`             | 替换图片链接为原始IP                             |
| `false`           | `true`              | 替换图片链接为本机代理, 启动代理服务器, 代理使用`HTTPS`访问图床域名 |
| `true`            | `true`              | 替换图片链接为本机代理, 启动代理服务器, 代理使用`HTTP`访问图床IP  |

### `pixiv`

Pixiv设置

- `lang` (Lang): 语言设置, 用于小说搜索, API报错等

| `lang`  | 语言      |
|---------|---------|
| `ja`    | 日本語     |
| `en`    | English |
| `zh-cn` | 简体中文    |
| `zh-tw` | 繁體中文    |

- `cookie` (string): 你的 Cookie (在 `www.pixiv.net`登录后 控制台使用 `document.cookie` 获取)

- `premium` (boolean): 拥有pixiv会员, 填入`false`启用非会员搜索优化, 参考 [工作方式](./HowToWork.md)

### `server`

API服务器设置

- `port` (number): 端口
- `host` (string): IP / 域名

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
- user

## About

交流群: `828350277`
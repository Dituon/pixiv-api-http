## HTTP 请求

<details>
<summary>
<b><code>GET</code></b><b><code>/manga/{id}</code></b>
</summary>
<br/>

### 获取漫画基本信息

| 参数 | 类型     | 描述 |
| ---- | -------- | ---- |
| `id` | `number` | Pid  |

示例: `http://127.0.0.1:1145/manga/98019984`

返回: `MangaDTO`

| key      | 类型            | 描述                                    |
| -------- | --------------- | --------------------------------------- |
| ...      | `IllustDTO`     | 参见 [`IllustDTO`](../illust/README.md) |
| `series` | `ItemSeriesDTO` | 系列数据                                |

```
{
    "id": 98019984,
    "title": "へっぽこ吸血鬼ちゃんは血が欲しい",
    "total": 5,
    "images": [
        {
            "urls": {
                "small": "...",
                "regular": "...",
                "original": "..."
            },
            "width": 800,
            "height": 1301
        },
        ...
    ],
    "createTime": 1651395658,
    "updateTime": 1651395658,
    "tags": [
        "漫画",
        "..."
    ],
    "restrict": "safe",
    "description": "...",
    "bookmarkCount": 16237,
    "likeCount": 14008,
    "viewCount": 327481,
    "author": {
        "name": "にいち",
        "id": 1035047
    },
    "series": {
        "id": 718,
        "title": "少女アラカルト",
        "order": 67,
        "prev": {
            "id": "97536981",
            "title": "花の季節"
        },
        "next": null
    }
}
```
---
</details>
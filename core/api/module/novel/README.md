## HTTP 请求

<details>
<summary>
<b><code>GET</code></b><b><code>/novel/{id}` 
</summary>
<br/>

| 参数 | 类型     | 描述 |
| ---- | -------- | ---- |
| `id` | `number` | Pid  |

示例: `http://127.0.0.1:1145/novel/15927906`

返回: `NovelDTO`

| key             | 类型               | 描述            |
| --------------- | ------------------ | --------------- |
| `id`            | `number`           | Pid             |
| `title`         | `string`           | 标题            |
| `description`   | `string`           | 介绍            |
| `tags`          | `string[]`         | 标签数组        |
| `lang`          | `Language`         | 语言枚举        |
| `restrict`      | `Restrict`         | 限制等级        |
| `charCount`     | `number`           | 字节数          |
| `wordCount`     | `number`           | 词数            |
| `createTime`    | `number`           | 创建日期        |
| `updateTime`    | `number`           | 更新日期        |
| `readingTime`   | `number`           | 阅读时间        |
| `bookmarkCount` | `number`           | 收藏数 (❤ 图标) |
| `likeCount`     | `number`           | 喜欢数 (😊 图标) |
| `viewCount`     | `number`           | 浏览量 (👁 图标) |
| `cover`         | `string`           | 封面图片        |
| `series`        | `ContentSeriesDTO` | 系列数据        |
| `author`        | `AuthorDTO`        | 作者            |
| `content`       | `string`           | 正文            |

```
{
    "id": 19115002,
    "title": "第2話『はじめての登下校』",
    "description": "",
    "tags": [
        "百合",
        "..."
    ],
    "lang": "ja",
    "restrict": "safe",
    "charCount": 4282,
    "wordCount": 1888,
    "readingTime": 513,
    "bookmarkCount": 11,
    "likeCount": 9,
    "viewCount": 353,
    "cover": "...",
    "series": {
        "id": 9943394,
        "title": "言語チート転生〜幼女VTuberは世界を救う〜",
        "prev": {
            "id": 19114998,
            "title": "第1話『終わりとはじまり』"
        },
        "next": {
            "id": 19115003,
            "title": "第3話『お姉ちゃんのお願い』"
        }
    },
    "author": {
        "id": 90197256,
        "name": "可愛ケイ@VTuber兼小説家"
    },
    "content": "..."
}
```
---
</details>

<details>
<summary>
<b><code>GET</code></b><b><code>/novel/series/{id}</code></b>
</summary>
<br/>

| 参数 | 类型     | 描述 |
| ---- | -------- | ---- |
| `id` | `number` | Pid  |

示例: `http://127.0.0.1:1145/novel/series/9943394`

返回: `NovelSericeInfoDTO`

| key      | 类型                 | 描述                          |
| -------- | -------------------- | ----------------------------- |
| `...`    | `NovelSericeInfoDTO` | 参考下文 `NovelSericeInfoDTO` |
| `novels` | `NovelInfoDTO[]`     | 参考下文 `NovelInfoDTO`       |

```
{
    "id": 9943394,
    "title": "言語チート転生〜幼女VTuberは世界を救う〜",
    "tags": [
        "百合",
        "..."
    ],
    "lang": "ja",
    "cover": "...",
    "restrict": "safe",
    "concluded": true,
    "total": 45,
    "charCount": 128761,
    "wordCount": 58687,
    "readingTime": 15451,
    "createTime": 1673809337,
    "updateTime": 1674504831,
    "author": {
        "name": "可愛ケイ@VTuber兼小説家",
        "id": 90197256
    },

    "novels": [
        {
            "id": 19114998,
            "title": "第1話『終わりとはじまり』",
            "description": "...",
            "tags": [
                "百合",
                "..."
            ],
            "restrict": "safe",
            "wordCount": 1095,
            "readingTime": 296000,
            "createTime": 1673810153000,
            "updateTime": 1674364856000,
            "bookmarkCount": 48,
            "author": {
                "name": "可愛ケイ@VTuber兼小説家",
                "id": 90197256
            }
        },
        ...
    ]
}
```
---
</details>

<details>
<summary>
<b><code>GET</code></b><b><code>/novel/series/{id}/info</code></b>
</summary>
<br/>

| 参数 | 类型     | 描述 |
| ---- | -------- | ---- |
| `id` | `number` | Pid  |

示例: `http://127.0.0.1:1145/novel/series/9943394/info`

返回: `NovelSericeInfoDTO`

| key           | 类型        | 描述     |
| ------------- | ----------- | -------- |
| `id`          | `number`    | Pid      |
| `title`       | `string`    | 标题     |
| `description` | `string`    | 介绍     |
| `tags`        | `string[]`  | 标签数组 |
| `lang`        | `Language`  | 语言枚举 |
| `cover`       | `string`    | 封面图片 |
| `restrict`    | `Restrict`  | 限制等级 |
| `concluded`   | `boolean`   | 完结状态 |
| `total`       | `number`    | 总篇数   |
| `charCount`   | `number`    | 字节数   |
| `wordCount`   | `number`    | 词数     |
| `createTime`  | `number`    | 创建日期 |
| `updateTime`  | `number`    | 更新日期 |
| `readingTime` | `number`    | 阅读时间 |
| `author`      | `AuthorDTO` | 作者     |

```
{
    "id": 9943394,
    "title": "言語チート転生〜幼女VTuberは世界を救う〜",
    "description": "...",
    "tags": [
        "百合",
        "..."
    ],
    "lang": "ja",
    "cover": "...",
    "restrict": "safe",
    "concluded": true,
    "total": 45,
    "charCount": 128761,
    "wordCount": 58687,
    "readingTime": 15451,
    "createTime": 1673809337,
    "updateTime": 1674504831,
    "author": {
        "name": "可愛ケイ@VTuber兼小説家",
        "id": 90197256
    }
}
```
---
</details>

<details>
<summary>
<b><code>GET</code></b><b><code>/novel/series/{id}/content</code></b>
</summary>
<br/>

| 参数 | 类型     | 描述 |
| ---- | -------- | ---- |
| `id` | `number` | Pid  |

示例: `http://127.0.0.1:1145/novel/series/9943394/content`

返回: `NovelInfoDTO[]`

*参考上文 `NovelDTO`*

```
[
    {
        "id": 19114998,
        "title": "第1話『終わりとはじまり』",
        "description": "...",
        "tags": [
            "百合",
            "..."
        ],
        "restrict": "safe",
        "wordCount": 1095,
        "readingTime": 296000,
        "createTime": 1673810153000,
        "updateTime": 1674364856000,
        "bookmarkCount": 48,
        "author": {
            "name": "可愛ケイ@VTuber兼小説家",
            "id": 90197256
        }
    },
    ...
]
```
---
</details>
## HTTP 请求

### `GET` `/illust/{id}`

| 参数 | 类型     | 描述 |
| ---- | -------- | ---- |
| `id` | `number` | Pid  |

示例: `http://127.0.0.1:1145/illust/104577879`

返回: `IllustDTO`

| key             | 类型         | 描述            |
| --------------- | ------------ | --------------- |
| `id`            | `number`     | Pid             |
| `title`         | `string`     | 标题            |
| `total`         | `number`     | 图片数量        |
| `images`        | `ImageDTO[]` | 图片数组        |
| `createTime`    | `number`     | 创建日期        |
| `updateTime`    | `number`     | 更新日期        |
| `tags`          | `string[]`   | 标签数组        |
| `restrict`      | `Restrict`   | 限制等级        |
| `description`   | `string`     | 介绍            |
| `bookmarkCount` | `number`     | 收藏数 (❤ 图标) |
| `likeCount`     | `number`     | 喜欢数 (😊 图标) |
| `viewCount`     | `number`     | 浏览量 (👁 图标) |
| `author`        | `AuthorDTO`  | 作者            |

```
{
    "id": 104577879,
    "title": "おでかけ",
    "total": 1,
    "images": [
        {
            "urls": {
                "small": "...",
                "regular": "...",
                "original": "..."
            },
            "width": 1620,
            "height": 2364
        }
    ],
    "createTime": 1673881211,
    "updateTime": 1673881211,
    "tags": [
        "東方",
        "..."
    ],
    "restrict": "safe",
    "description": "...",
    "bookmarkCount": 3802,
    "likeCount": 2333,
    "viewCount": 14240,
    "author": {
        "name": "久蒼穹",
        "id": 66038798
    }
}
```

### `GET` `/illust/{id}/images`

| 参数 | 类型     | 描述 |
| ---- | -------- | ---- |
| `id` | `number` | Pid  |

示例: `http://127.0.0.1:1145/illust/104577879/images`

返回: `ImageDTO[]`

```
[
  {
    "urls": {
      "small": "...",
      "regular": "...",
      "original": "..."
    },
    "width": 1620,
    "height": 2364
  }
]
```

### `GET` `/illust/{id}/images/{page}`

| 参数   | 类型     | 描述   |
| ------ | -------- | ------ |
| `id`   | `number` | Pid    |
| `page` | `number` | 页码数 |

示例: `http://127.0.0.1:1145/illust/104577879/images/1`

返回: `ImageDTO`

```
{
  "urls": {
    "small": "...",
    "regular": "...",
    "original": "..."
  },
  "width": 1620,
  "height": 2364
}
```
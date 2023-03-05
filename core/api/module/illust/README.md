## HTTP 请求

<details>
<summary>
<b><code>GET</code></b><b><code>/illust/{id}</code></b>
</summary>
<br/>

### 获取插画基本信息

| 参数   | 类型       | 描述  |
|------|----------|-----|
| `id` | `number` | Pid |

示例: `http://127.0.0.1:1145/illust/104577879`

返回: `IllustDTO`

| key             | 类型           | 描述          |
|-----------------|--------------|-------------|
| `id`            | `number`     | Pid         |
| `title`         | `string`     | 标题          |
| `total`         | `number`     | 图片数量        |
| `images`        | `ImageDTO[]` | 图片数组        |
| `createTime`    | `number`     | 创建日期        |
| `updateTime`    | `number`     | 更新日期        |
| `tags`          | `string[]`   | 标签数组        |
| `restrict`      | `Restrict`   | 限制等级        |
| `description`   | `string`     | 介绍          |
| `bookmarkCount` | `number`     | 收藏数 (❤ 图标)  |
| `likeCount`     | `number`     | 喜欢数 (😊 图标) |
| `viewCount`     | `number`     | 浏览量 (👁 图标) |
| `author`        | `AuthorDTO`  | 作者          |

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

---
</details>

<details>
<summary>
<b><code>GET</code></b><b><code>/illust/{id}/images</code></b>
</summary>
<br/>

### 获取插画图片

| 参数   | 类型       | 描述  |
|------|----------|-----|
| `id` | `number` | Pid |

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

---
</details>

<details>
<summary>
<b><code>GET</code></b><b><code>/illust/{id}/images/{page}</code></b>
</summary>
<br/>

### 获取插画图片(指定页码数)

| 参数     | 类型       | 描述  |
|--------|----------|-----|
| `id`   | `number` | Pid |
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

---
</details>

<details>
<summary>
<b><code>GET</code></b><b><code>/illust/{id}/recommend</code></b>
</summary>
<br/>

### 获取插画相关作品信息

| 参数     | 类型       | 描述  | 默认值  |
|--------|----------|-----|------|
| `id`   | `number` | Pid | N/A  |
| `size` | `number` | 容量  | `20` |

示例: `http://127.0.0.1:1145/illust/105001750/recommend?size=10`

返回: `IllustRecommendDTO[]`

```
[
    {
        "id": 102773441,
        "title": "諏訪子",
        "type": "illust",
        "tags": [
            "東方",
            "東方Project",
            "洩矢諏訪子",
            ...
        ],
        "cover": "...",
        "restrict": "safe",
        "createTime": 1668351819000,
        "updateTime": 1668351819000,
        "total": 1,
        "author": {
            "id": 49675420,
            "name": "かめぱすた"
        }
    },
    ...
]
```

</details>

<details>
<summary>
<b><code>GET</code></b><b><code>/illust/{id}/recommend/ids</code></b>
</summary>
<br/>

### 获取插画相关作品ID

| 参数     | 类型       | 描述  | 默认值  |
|--------|----------|-----|------|
| `id`   | `number` | Pid | N/A  |
| `size` | `number` | 容量  | `20` |

示例: `http://127.0.0.1:1145/illust/105001750/recommend/ids?size=10`

返回: `number[]`

```
[
    104999610,
    104104387,
    104685723,
    105373312,
    104920874,
    105515966,
    104385177,
    104678965,
    105587193,
    105669998
]
```

</details>
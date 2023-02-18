## HTTP 请求

<details open>
<summary>
<b><code>POST</code></b><b><code>/search</code></b>
</summary>
<br/>

### `SearchParam`:

| 参数       | 类型           | 描述       | 默认值   |
| ---------- | -------------- | ---------- | -------- |
| `word`     | `string`       | 搜索词     | 必填     |
| `type`     | `SearchType`   | 搜索类型   | `illust` |
| `template` | `TemplateType` | 预设模板   | 无       |
| `mode`     | `SearchMode`   | 搜索模式   | `tag`    |
| `order`    | `SearchOrder`  | 排序方法   | `date`   |
| `blt`      | `number`       | 最少收藏数 | `0`      |
| `restrict` | `Restrict`     | 限制等级   | `safe`   |
| `start`    | `number`       | 起始索引   | `0`      |
| `length`   | `number`       | 索引长度   | `60`     |
| `lang`     | `Lang`         | 语言       | 配置文件 |

### ENUM:

##### `SearchType`

限定搜索类型

| Name             | Description    |
| ---------------- | -------------- |
| `illust`         | 插画           |
| `gif`            | 动态插画 (GIF) |
| `illust_and_gif` | 插画与动态插画 |
| `manga`          | 漫画           |
| `novel`          | 小说           |

##### `TemplateType`

使用预设模板

| Name      | Description                  |
| --------- | ---------------------------- |
| `top`     | 收数数降序排列               |
| `default` | 时间倒序, 收藏数不少于`2000` |
| `enhance` | 时间倒序, 收藏数不少于`50`   |

##### `SearchMode`

指定搜索模式

| Name      | Description        |
| --------- | ------------------ |
| `tag`     | 标签 部分匹配      |
| `full`    | 标签 完全匹配      |
| `content` | 标题/正文 部分匹配 |

##### `SearchOrder`

指定排序方式

| Name      | Description |
| --------- | ----------- |
| `date`    | 日期倒序    |
| `popular` | 收藏数降序  |

##### `Restrict`

指定限制级

| Name   | Description    |
| ------ | -------------- |
| `safe` | 全年龄向       |
| `r18`  | `R-18` `R-18G` |
| `all`  | 全部           |

示例请求: `http://127.0.0.1:1145/search`

```
{
    word: "東方Project",
    type: "illust",
    template: "default",
    length: 20
}
```

返回: `SearchResultDTO`

| key       | 类型                 | 描述         |
| --------- | -------------------- | ------------ |
| `results` | `ResultPreviewDTO[]` | 作品预览数组 |
| `total`   | `number`             | 作品总数     |

```
{
    "results": [
        {
            "id": 105495972,
            "title": "宵闇の従者",
            "preview": "...",
            "tags": [
                "十六夜咲夜",
                "東方",
                "東方Project"
            ],
            "cerateTime": 1676718359000,
            "updateTime": 1676718359000,
            "author": {
                "name": "彩川賢治",
                "id": 15683392
            }
        },
        ...
    ],
    "total": 1918834
}
```

</derails>
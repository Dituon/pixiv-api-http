<details>
<summary>
<b><code>POST</code></b><b><code>/follow</code></b>
</summary>
<br/>

### 获取已关注用户的最新作品

(**需设置Cookie**)

### `FollowUpdateParam`:

| 参数         | 类型            | 描述   | 默认值      |
|------------|---------------|------|----------|
| `type`     | `ArtworkType` | 搜索类型 | `illust` |
| `restrict` | `Restrict`    | 限制等级 | `safe`   |
| `start`    | `number`      | 起始索引 | `0`      |
| `length`   | `number`      | 索引长度 | `60`     |
| `lang`     | `Lang`        | 语言   | 配置文件     |

##### `ArtworkType`

限定作品类型

| Name     | Description  |
|----------|--------------|
| `illust` | 插画 (动态插画与漫画) |
| `novel`  | 小说           |

##### `Restrict`

指定限制级

| Name   | Description    |
|--------|----------------|
| `safe` | 全年龄向           |
| `r18`  | `R-18` `R-18G` |
| `all`  | 全部             |

示例: `http://127.0.0.1:1145/follow`

返回: `ResultPreviewDTO[]`

```
[
    {
        "id": 105680390,
        "title": "天衣無縫",
        "cover": "...",
        "tags": [
            "東方",
            "東方緋想天",
            ...
        ],
        "createTime": 1677250811000,
        "updateTime": 1677250811000,
        "restrict": 'safe',
        "total": 1,
        "author": {
            "name": "久蒼穹",
            "id": 66038798
        }
    },
    ...
]
```

---
</details>

<details>
<summary>
<b><code>WebSocket</code></b><b><code>/follow-update</code></b>
</summary>
<br/>

### 获取更新推送

每**5分钟**从Pixiv服务器请求一次数据, 如果有已关注用户的最新作品更新, 则推送 `ResultPreviewDTO[]`

示例: `ws://127.0.0.1:4514/follow-update`

推送: `ResultPreviewDTO[]`

```
[
    {
        "id": 105680390,
        "title": "天衣無縫",
        "cover": "...",
        "tags": [
            "東方",
            "東方緋想天",
            ...
        ],
        "createTime": 1677250811000,
        "updateTime": 1677250811000,
        "restrict": 'safe',
        "total": 1,
        "author": {
            "name": "久蒼穹",
            "id": 66038798
        }
    },
    ...
]
```

---
</details>
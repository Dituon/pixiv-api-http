# 工作方式

## 免会员搜索

Pixiv为热门Tag的作品自动添加`xxusers入り`标签, 可利用此标签实现免会员搜索

标签必须严格匹配, 如 `东方project1000users入り` 与 `東方Project1000users入り` 是完全不同的, 后者为Pixiv自动添加

#### 有效标签

- `100users入り`
- `250users入り`
- `300users入り`
- `500users入り`
- `1000users入り`
- `3000users入り`
- `5000users入り`
- `10000users入り`
- `20000users入り`
- `30000users入り`

#### 工作流程

1. 将传入的收藏过滤器参数向上取最接近的值; 如 `blt=720` 取 `1000users入り`
2. 程序根据传入Tag与过滤器获取**相关Tag**; 如 `word=东方` `blt=720` 转换为 `东方 1000users入り` 获取相关Tag
3. 程序根据**相关Tag**名称与作品数量进行过滤, 选出**主Tag**; 如 `东方 1000users入り` **主Tag**为 `東方Project1000users入り`
4. 通过**主Tag**搜索, 返回结果

#### 注意

实验性质, 适用于单个热门标签, 多关键词搜索结果可能不尽人意

更改配置文件 `config.js` 中 `pixiv.premium = false` 启用此功能
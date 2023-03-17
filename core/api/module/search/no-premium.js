// import {pixivJsonFetch} from "../../../pixiv-fetch/index.js";
import {search} from "./search.js";

const arr = [100, 250, 300, 500, 1000, 3000, 5000, 10000, 20000, 30000]
const map = new Map(arr.reduceRight(
    (res, i) =>
        [...res, [i, res.push([i, i + 'users入り']) && res.slice(-2).map(s => s[1]).join(' OR ')]],
    []
).map(s => [s[0], `(${s[1]})`]))

/**
 * @param {SearchParam} param
 * @param {SearchTypeInfo} typeInfo
 */
export async function fixParam(param, typeInfo) {
    // let singleWordFlag = !param.word.includes(' ')
    param.word += ' ' + map.get(param.blt) ?? map.get(
        arr.find(n => !(n - param.blt & 0x80000000)) ?? 30000
    )
    // const data = await searchNoPremium({...param, p: 1}, typeInfo)
    // let mainTag = data.relatedTags.find(w => w.endsWith(extraTag))
    // if (mainTag === param.word.replace(' ', '')) return data.raw
    // if (singleWordFlag) param.word = mainTag
    // console.log(param.word)
    return search(typeInfo.path, typeInfo.name, param)
}

// /**
//  * @param {SearchParam} param
//  * @param {SearchTypeInfo} typeInfo
//  * @return {Promise<{relatedTags: string[], raw: SearchResultDTO}>}
//  */
// async function searchNoPremium(param, typeInfo) {
//     const data = await pixivJsonFetch(`/ajax/search/${typeInfo.path}/${encodeURIComponent(param.word)}`, param)
//     const results = []
//     for (const single of data[typeInfo.name].data) {
//         results.push({
//             id: +(single.id),
//             title: single.title,
//             cover: single.url,
//             tags: single.tags,
//             createTime: new Date(single.createDate).getTime(),
//             updateTime: new Date(single.updateDate).getTime(),
//             author: {
//                 name: single.userName,
//                 id: +(single.userId)
//             }
//         })
//     }
//     return {
//         relatedTags: data.relatedTags,
//         raw: {
//             results,
//             total: data[typeInfo.name].total
//         }
//     }
// }
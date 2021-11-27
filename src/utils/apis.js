import { $post } from './http2.js';
let url=process.env.NODE_ENV == "development" ? "/shareApi" :"http://tm.lilanz.com/oa/api/BrandNewsCore.ashx"
export function getWxInfo(data) {
    return $post(url, data);
}
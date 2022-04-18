const axios = require('axios')
var COS = require('cos-js-sdk-v5');
var cos = new COS({
    getAuthorization: async function(options, callback) {
        var response = await axios.get('http://www.dust.com:81/api/cos/tmp-credential')
        console.log(response)
        const data = response.data
        const credentials = data.credentials
        callback({
            TmpSecretId: credentials.tmpSecretId,
            TmpSecretKey: credentials.tmpSecretKey,
            SecurityToken: credentials.sessionToken,
            // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
            StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
            ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000000
        })
    }
})
export { cos }
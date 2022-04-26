function checkUsername(username) {
    const pattern = /^[\u4E00-\u9FA5A-Za-z0-9]{4,14}$/ 
    return pattern.test(username)
}

function checkSteamApiKey(steamApiKey) {
    const pattern = /^[A-Z0-9]{32}$/ 
    return pattern.test(steamApiKey)
}

function checkSteamTradeUrl(steamTradeUrl) {
    const pattern = /^https:\/\/steamcommunity.com\/tradeoffer\/new\/\?partner=[0-9]{1,12}&token=[A-Za-z0-9]{8}$/
    return pattern.test(steamTradeUrl)
}

export { checkUsername, checkSteamApiKey, checkSteamTradeUrl }
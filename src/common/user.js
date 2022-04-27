function isLoggedIn() {
    const jwt = getCookie("jwt")
    return jwt !== undefined && jwt !== "" && jwt !== '""'
}

function logout() {
    deleteCookie("jwt")
}

function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [k,v] = el.split('=')
      cookie[k.trim()] = v
    })
    return cookie[name]
}

function deleteCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

export {isLoggedIn, logout}
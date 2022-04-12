function isLoggedIn() {
    return getCookie("jwt") !== undefined
}

function logout() {
    deleteCookie("jwt")
}

function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [k,v] = el.split('=');
      cookie[k.trim()] = v;
    })
    return cookie[name];
}

function deleteCookie(name) {
    document.cookie = name +'=; Max-Age=0;'
}

export {isLoggedIn, logout}
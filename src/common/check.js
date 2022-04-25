function checkUsername(username) {
    if (username.length < 4 || username.length > 14) {
        return false
    }
    const pattern = /^[\u4E00-\u9FA5A-Za-z0-9]+$/ 
    return pattern.test(username)
}

export { checkUsername }
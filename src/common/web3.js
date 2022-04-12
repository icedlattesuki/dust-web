const Web3 = require('web3')

var web3

async function connectToWallet() {
    if (web3) {
        return web3
    }
    if (window.ethereum) {
        await window.ethereum.request({method: 'eth_requestAccounts'})
        web3 = new Web3(window.ethereum)
    }
    return web3
}

export { connectToWallet }
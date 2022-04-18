<template>
    <NavBar></NavBar>
    <a-row type="flex" justify="center" align="middle">
        <a-col :span="9">
        </a-col>
        <a-col :span="6">
            <div class="login">
                <!-- <dust-icon type="icon-qianbao1" :style="walletIconStyle"/> -->
                <h2>使用以太坊钱包登录</h2>
                <a-button class="login-button" @click="login"><dust-icon type="icon-metamask-fox" :style="metamaskIconStyle"/><span>MetaMask</span></a-button>
            </div>
        </a-col>
        <a-col :span="9">
        </a-col>
    </a-row>
    
</template>

<script>
import { defineComponent } from "vue"
import NavBar from '../components/NavBar.vue'
import { connectToWallet } from '../common/web3'
import { isLoggedIn } from '../common/user'
import { DustIcon } from '../common/icon'


const axios = require('axios')
const walletIconStyle = {}
walletIconStyle.fontSize = "60px"
const metamaskIconStyle = {}
metamaskIconStyle.fontSize = "30px"


export default defineComponent({
    components: {
        NavBar,
        DustIcon
    },
    data() {
        return {
            walletIconStyle,
            metamaskIconStyle
        }
    },
    methods: {
        async login() {
            if (isLoggedIn()) {
                return
            }
            const web3 = await connectToWallet()
            // error message when web3 is null
            const accounts = await web3.eth.getAccounts()
            const selectedAccount = accounts[0]
            var response = await axios.get(`/api/auth/nonce?publicAddress=${selectedAccount}`)
            console.log(response)
            const signedMessage = await web3.eth.personal.sign(response.data.toString(), selectedAccount)
            response = await axios.post('/api/auth/login', {
                publicAddress: selectedAccount,
                signature: signedMessage
            })
            console.log(response)
            this.$router.push('/market')
        }
    }
})
</script>

<style scoped>
.login {
    text-align: center;
    margin-top: 100px;
}

.login-button {
    width: 100%;
    height: 50px;
    border-radius: 7px;
    border-width: 1px;
    font-size: 17px;
    font-weight: 500;
    margin-top: 20px;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center;
}
</style>

<template>
    <NewNavBar></NewNavBar>
    <div class="text-center pt-20">
        <h1 class="leading-tight text-3xl mt-0 mb-7">使用以太坊钱包登录</h1>
        <button class="px-32 py-1.5 text-red-700 border border-red-700 rounded hover:bg-red-700 hover:text-white active:bg-red-600 focus:outline-none focus:ring space-x-1" @click="login">
            <dust-icon type="icon-metamask-fox" :style="metamaskIconStyle"/>
            <span class="text-base tracking-wide">MetaMask</span>
        </button>
    </div>
</template>

<script>
import { defineComponent } from "vue"
import axios from 'axios'
import { connectToWallet } from '../common/web3'
import { isLoggedIn } from '../common/user'
import { DustIcon } from '../common/icon'
import NewNavBar from '../components/NewNavBar.vue'


const walletIconStyle = {}
walletIconStyle.fontSize = "60px"
const metamaskIconStyle = {}
metamaskIconStyle.fontSize = "30px"


export default defineComponent({
    components: {
        DustIcon,
        NewNavBar
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

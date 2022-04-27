<template>
    <NavBar></NavBar>
    <div class="text-center pt-20">
        <h1 class="leading-tight text-3xl mt-0 mb-7">使用以太坊钱包登录</h1>
        <button class="px-32 py-1.5 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white focus:outline-none space-x-1" @click="login">
            <dust-icon type="icon-metamask-fox" :style="metamaskIconStyle"/>
            <span class="text-base tracking-wide">MetaMask</span>
        </button>
    </div>
</template>

<script>
import { defineComponent } from "vue"
import { Modal } from 'ant-design-vue'
import axios from 'axios'
import { connectToWallet } from '../common/web3'
import { isLoggedIn } from '../common/user'
import { DustIcon } from '../common/icon'
import NavBar from '../components/NavBar.vue'

export default defineComponent({
    components: {
        DustIcon,
        NavBar
    },
    data() {
        return {
            walletIconStyle: {
                fontSize: "60px"
            },
            metamaskIconStyle: {
                fontSize: "30px"
            }
        }
    },
    methods: {
        async login() {
            if (isLoggedIn()) {
                return
            }
            const web3 = await connectToWallet()
            if (!web3) {
                Modal.error({
                    title: "连接钱包失败",
                })
            }
            const accounts = await web3.eth.getAccounts()
            const selectedAccount = accounts[0]
            try {
                const response = await axios.get(`/api/auth/nonce?publicAddress=${selectedAccount}`)
                const signedMessage = await web3.eth.personal.sign(response.data.toString(), selectedAccount)
                await axios.post('/api/auth/login', {
                    publicAddress: selectedAccount,
                    signature: signedMessage
                })
                this.$router.push('/market')
            } catch(e) {
                console.log(e)
                Modal.error({
                    title: "登录失败",
                })
            }
        }
    }
})
</script>
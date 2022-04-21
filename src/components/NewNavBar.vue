<template>
  <header class="border-b border-gray-100">
    <div class="flex items-center justify-between h-16 mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
        <div class="flex items-center">
            <a href="/" class="flex">
                <span class="flex w-32 h-10 items-center justify-center text-2xl tracking-widest font-mono">Dust</span>
            </a>
        </div>

        <div class="flex items-center justify-end flex-1">
            <nav class="flex text-gray-500 tracking-wide text-xs space-x-6">
                <a href="/market" class="block h-16 leading-[4rem] text-base border-b-4 border-transparent hover:text-red-700 hover:border-current" >
                    市场
                </a>

                <a href="/repo" class="block h-16 leading-[4rem] text-base border-b-4 border-transparent hover:text-red-700 hover:border-current">
                    库存
                </a>

                <a href="/feedback" class="block h-16 leading-[4rem] text-base border-b-4 border-transparent hover:text-red-700 hover:border-current">
                    反馈
                </a>

                <div class="group relative dropdown" v-if="isLoggedIn">
                    <a href="/user/setting" class="flex h-16 border-b-4 border-transparent hover:text-red-700 hover:border-current items-center justify-center ">
                        <a-avatar :src="avatarUrl" :size="32">
                        </a-avatar>
                    </a>
                    <div class="group-hover:block dropdown-menu absolute hidden">
                        <ul class="top-0 w-48 bg-white shadow px-3 py-3">
                            <li class="py-1"><button @click="logout">退出</button></li>
                        </ul> 
                    </div>
                </div>

                <div class="flex items-center justify-center" v-else>
                    <a class="inline-block px-6 py-2 text-sm font-medium text-red-700 border border-red-700 rounded hover:bg-red-700 hover:text-white active:bg-red-600 focus:outline-none focus:ring" href="/login">
                        注册/登录
                    </a>
                </div>
            </nav>
        </div>
    </div>
</header>
</template>

<script>
import axios from 'axios';
import * as user from '../common/user'

export default {
    components: {
    },
    data() {
        return {
           avatarUrl: '',
           isLoggedIn: false
        }
    },
    methods: {
        logout() {
            user.logout()
            this.isLoggedIn = false
            this.$router.push('/market')
        }
    },
    mounted: async function() {
        if (user.isLoggedIn()) {
            this.isLoggedIn = true
            const response = await axios.get('/api/user/profile')
            if (response.status === 200) {
                const profile = response.data
                this.avatarUrl = profile.avatarUrl
            }
        }
    }
}
</script>
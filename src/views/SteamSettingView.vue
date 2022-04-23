<template>
    <NewNavBar></NewNavBar>
    <div class="flex h-screen mx-auto max-w-screen-2xl sm:px-6 lg:pl-16 pt-10">
        <div class="">
            <div class="w-60 h-full shadow-md bg-white">
                <ul class="relative">
                    <li class="relative">
                        <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/user/setting/profile">
                            账户设置
                        </a>
                     </li>
                    <li class="relative">
                        <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/user/setting/steam">
                           Steam设置
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="ml-32 w-1/2">
            
        </div>
</div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';
import NewNavBar from '../components/NewNavBar.vue'

export default defineComponent({
    components: {
        NewNavBar
    },
    data() {
        return {
            steamId: '',
            steamApiKey: '',
            steamTradeUrl: '',
        }
    },
    methods: {
        
    },
    mounted: async function() {
        const response = await axios.get('/api/user/profile')
        const profile = response.data
        this.steamId = profile.steamId
        this.steamApiKey = profile.apiKey
        this.steamTradeUrl = profile.tradeUrl
    }
})
</script>

<template>
    <NewNavBar></NewNavBar>
    <div class="flex h-screen mx-auto max-w-screen-2xl sm:px-6 lg:pl-16 pt-10 tracking-wider">
        <div class="">
            <div class="w-60 h-full shadow-md bg-white">
                <ul class="relative">
                    <li class="relative">
                        <a class="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/user/setting/profile">
                            账户设置
                        </a>
                     </li>
                </ul>
            </div>
        </div>
        <div class="ml-32 w-1/2">
            <div>
                <div class="flex flex-col items-center">
                    <a-avatar :size="80" :src="avatarSrc">
                    </a-avatar>
                    <a-upload class="mt-5" v-model:fileList="fileList" :customRequest="uploadAvatar" :disabled="disableUploadAvatar" :showUploadList=false :maxCount=1> 
                        <button class="px-2 py-1 text-red-700 border border-red-700 rounded hover:bg-red-700 hover:text-white active:bg-red-600 focus:outline-none focus:ring tracking-wider">
                            上传新头像
                        </button>
                    </a-upload>
                </div>
            </div>
            <div class="mt-12">
                <div class="flex justify-between items-center">
                    <div class="w-32">
                        <p class="text-sm font-medium text-gray-700">以太坊地址</p>
                    </div>
                    <div class="w-80">
                        <p class="text-sm  text-gray-700">{{ publicAddress }}</p>
                    </div>
                    <div class="w-32 text-right">
                        
                    </div>
                </div>
            </div>
            <a-divider />
            <div class="mt-8">
                <div class="flex justify-between items-center">
                    <div class="w-32">
                        <p class="text-sm font-medium text-gray-700">用户名</p>
                    </div>
                    <div class="w-80">
                        <input class="w-full p-2 text-sm border-2 border-gray-200 rounded focus:outline-none tracking-wide" v-model="username"/>
                    </div>
                    <div class="w-32 text-right">
                        <button class="px-5 py-1 text-red-700 border border-red-700 rounded hover:bg-red-700 hover:text-white active:bg-red-600 focus:outline-none focus:ring tracking-wide">
                            更新
                        </button>
                    </div>
                </div>
            </div>
            <a-divider />
            <div class="mt-8">
                <div class="flex justify-between items-center">
                    <div class="w-32">
                        <p class="text-sm font-medium text-gray-700">Steam ID</p>
                    </div>
                    <div class="w-80">
                        <p class="text-sm font-medium text-gray-700">未绑定Steam</p>
                    </div>
                    <div class="w-32 text-right">
                        <form action="https://steamcommunity.com/openid/login" method="post">
                            <input type="hidden" name="openid.identity"
                                value="http://specs.openid.net/auth/2.0/identifier_select" />
                            <input type="hidden" name="openid.claimed_id"
                                value="http://specs.openid.net/auth/2.0/identifier_select" />
                            <input type="hidden" name="openid.ns" value="http://specs.openid.net/auth/2.0" />
                            <input type="hidden" name="openid.mode" value="checkid_setup" />
                            <input type="hidden" name="openid.realm" value="http://www.dust.com" />
                            <input type="hidden" name="openid.return_to" value="http://www.dust.com:81/user/setting/steam" />
                            <a-button html-type="submit">绑定steam</a-button>
                        </form>
                    </div>
                </div>
            </div>
            <a-divider />
            <div class="mt-8">
                <div class="flex justify-between items-center">
                    <div class="w-32">
                        <p class="text-sm font-medium text-gray-700 mb-4">Steam Api Key</p>
                    </div>
                    <div class="w-80">
                        <input class="w-full p-1 text-sm border-2 border-gray-200 rounded focus:outline-none" v-model="steamApiKey"/>
                    </div>
                    <div class="w-32 text-right">
                        <button class="px-5 py-1 text-red-700 border border-red-700 rounded hover:bg-red-700 hover:text-white active:bg-red-600 focus:outline-none focus:ring">
                            更新
                        </button>
                    </div>
                </div>
            </div>
            <a-divider />
            <div class="mt-8">
                <div class="flex justify-between items-center">
                    <div class="w-32">
                        <p class="text-sm font-medium text-gray-700">Steam交易链接</p>
                    </div>
                    <div class="w-80">
                        <input class="w-full p-1 text-sm border-2 border-gray-200 rounded focus:outline-none" v-model="steamTradeUrl"/>
                    </div>
                    <div class="w-32 text-right">
                        <button class="px-5 py-1 text-red-700 border border-red-700 rounded hover:bg-red-700 hover:text-white active:bg-red-600 focus:outline-none focus:ring">
                            更新
                        </button>
                    </div>
                </div>
            </div>
        </div>
</div>
    <!-- <a-button type="primary" @click="userLogout">退出登录</a-button> -->
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';
import NewNavBar from '../components/NewNavBar.vue'
import { cos } from '../common/cos'

export default defineComponent({
    components: {
        NewNavBar
    },
    data() {
        return {
            username: '',
            avatarSrc: '',
            publicAddress: '',
            beforeUpload: () => false,
            disableUploadAvatar: false,
            maxCount: 1,
            showUploadList: false,
            fileList: [],
        }
    },
    methods: {
        async uploadAvatar(request) {
            const avatarKey = `avatar/${request.file.name}`
            this.disableUploadAvatar = true
            await cos.putObject({
                Bucket: 'dust-test-1253732422',
                Region: 'ap-shanghai',
                Key: avatarKey,
                Body: request.file
            })
            var response = await axios.post('/api/user/avatar', {
                'avatarKey': avatarKey
            })
            this.avatarSrc = response.data
            this.disableUploadAvatar = false
            request.onSuccess()
        }
    },
    mounted: async function() {
        const response = await axios.get('/api/user/profile')
        const profile = response.data
        this.username = profile.name
        this.publicAddress = profile.publicAddress
        this.avatarSrc = profile.avatarUrl
    }
})
</script>

<template>
    <NewNavBar></NewNavBar>
    <div class="flex h-screen mx-auto max-w-screen-2xl sm:px-6 lg:pl-16 pt-10 tracking-wider">
        <div class="">
            <div class="w-60 shadow-md bg-white">
                <ul class="relative">
                    <li class="relative">
                        <a class="flex items-center text-sm  tracking-wider py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="/user/profile">
                            账户设置
                        </a>
                     </li>
                </ul>
            </div>
        </div>
        <div class="ml-32 w-1/2">
            <a-spin :spinning="spinning">
                <div>
                    <div class="flex flex-col items-center">
                        <a-avatar :size="80" :src="avatarSrc">
                        </a-avatar>
                        <a-upload class="mt-5" v-model:fileList="fileList" :customRequest="uploadAvatar" :showUploadList=false :maxCount=1> 
                            <button class="px-3 py-1 bg-blue-500 text-white rounded-sm hover:bg-blue-700 focus:bg-blue-700 focus:outline-none tracking-wider">
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
                            <input class="w-full p-2 text-sm text-gray-700 tracking-wider border-2 border-gray-200 rounded-sm focus:outline-none" v-model="username"/>
                        </div>
                        <div class="w-32 text-right">
                            <button class="px-5 py-1 bg-blue-500 text-white rounded-sm hover:bg-blue-700 focus:bg-blue-700 focus:outline-none tracking-wider" @click="updateUsername">
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
                            <div v-if="isBindSteam">
                                <p class="text-sm text-gray-700 tracking-wider"> {{ steamId }}</p>
                            </div>
                            <div class="flex" v-else>
                                <dust-icon type="icon-warning" :style="warnningIconStyle"/>
                                <p class="text-sm text-gray-700 tracking-wider">未绑定Steam</p>
                            </div>
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
                                <input type="hidden" name="openid.return_to" value="http://www.dust.com:81/user/profile" />
                                <button type="submit" class="px-5 py-1 bg-blue-500 text-white rounded-sm hover:bg-blue-700 focus:bg-blue-700 focus:outline-none tracking-wider" v-if="!isBindSteam">
                                    绑定
                                </button>
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
                            <input class="w-full p-1 text-sm text-gray-700 tracking-wider border-2 border-gray-200 rounded-sm focus:outline-none" v-model="steamApiKey"/>
                        </div>
                        <div class="w-32 text-right">
                            <button class="px-5 py-1 bg-blue-500 text-white rounded-sm hover:bg-blue-700 focus:bg-blue-700 focus:outline-none  tracking-wide" @click="updateSteamApiKey">
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
                            <input class="w-full p-1 text-sm text-gray-700 tracking-wider border-2 border-gray-200 rounded-sm focus:outline-none" v-model="steamTradeUrl"/>
                        </div>
                        <div class="w-32 text-right">
                            <button class="px-5 py-1 bg-blue-500 text-white rounded-sm hover:bg-blue-700 focus:bg-blue-700 focus:outline-none  tracking-wide" @click="updateSteamTradeUrl">
                                更新
                            </button>
                        </div>
                    </div>
                </div>
            </a-spin>
        </div>
</div>
    <!-- <a-button type="primary" @click="userLogout">退出登录</a-button> -->
</template>

<script>
import { defineComponent } from 'vue'
import { Modal } from 'ant-design-vue'
import axios from 'axios';
import NewNavBar from '../components/NewNavBar.vue'
import { cos } from '../common/cos'
import { DustIcon } from '../common/icon'


export default defineComponent({
    components: {
        NewNavBar,
        DustIcon
    },
    data() {
        return {
            username: '',
            avatarSrc: '',
            publicAddress: '',
            steamId: '',
            isBindSteam: false,
            steamApiKey: '',
            steamTradeUrl: '',
            beforeUpload: () => false,
            maxCount: 1,
            showUploadList: false,
            fileList: [],
            spinning: false,
            warnningIconStyle: {
                fontSize: "20px"
            }
        }
    },
    methods: {
        async uploadAvatar(request) {
            this.spinning = true
            try {
                const avatarKey = `avatar/${request.file.name}`
                await cos.putObject({
                    Bucket: 'dust-test-1253732422',
                    Region: 'ap-shanghai',
                    Key: avatarKey,
                    Body: request.file
                })
                const response = await axios.post('/api/user/avatar', {
                    'avatarKey': avatarKey
                })
                this.avatarSrc = response.data
                request.onSuccess()
                this.openSuccessModal("上传头像成功")
            } catch(e) {
                this.openFailModal("上传头像失败")
            }
        },
        async updateUsername() {
            this.spinning = true
            try {
                await axios.post('/api/user/username', {
                    username: this.username
                })
                this.openSuccessModal("更新用户名成功")
            } catch (e) {
                this.openFailModal("更新用户名失败")
            }
        },
        async bindSteam(steamReturnUrl) {
            if (this.isBindSteam) {
                return
            }
            this.spinning = true
            try {
                const response = await axios.post('/api/user/steamid', {
                    steamReturnUrl: steamReturnUrl
                })
                this.steamId = response.data
                this.isBindSteam = true
                this.openSuccessModal("绑定Steam成功")
            } catch(e) {
                this.openFailModal("绑定Steam失败")
            }
        },
        async updateSteamApiKey() {
            this.spinning = true
            try {
                await axios.post('/api/user/steam-api-key', {
                    steamApiKey: this.steamApiKey
                })
                this.openSuccessModal("更新Steam Api Key成功")
            } catch(e) {
                this.openFailModal("更新Steam Api Key失败")
            }
        },
        async updateSteamTradeUrl() {
            this.spinning = true
            try {
                await axios.post('/api/user/steam-trade-url', {
                    steamTradeUrl: this.steamTradeUrl
                })
                this.openSuccessModal("更新Steam交易链接成功")
            } catch(e) {
                this.openFailModal("更新Steam交易链接失败")
            }
        },
        openSuccessModal(title) {
            this.spinning = false
            Modal.success({
                title: title,
            })
        },
        openFailModal(title) {
            this.spinning = false
            Modal.error({
                title: title,
            })
        }
    },
    mounted: async function() {
        const response = await axios.get('/api/user/profile')
        const profile = response.data
        this.username = profile.name
        this.publicAddress = profile.publicAddress
        this.avatarSrc = profile.avatarUrl
        this.steamId = profile.steamId
        this.isBindSteam = Boolean(profile.steamId)
        this.steamApiKey = profile.steamApiKey
        this.steamTradeUrl = profile.steamTradeUrl

        const url = window.location.href
        if (url.includes('openid')) {
            this.bindSteam(url)
        }
    }
})
</script>

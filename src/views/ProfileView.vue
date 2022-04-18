<template>
    <NavBar></NavBar>
    <a-row type="flex" justify="center" align="middle">
        <a-col :span="9">
        </a-col>
        <a-col :span="6">
            <div>
                <h2 class="profile-title">账户设置</h2>
                <div>
                    <div class="profile-item">
                        <a-row type="flex" justify="center" align="middle">
                            <a-col :span="12">
                                <div>
                                    <a-avatar :size="64" :src="avatarSrc">
                                    </a-avatar>
                                </div>
                            </a-col>
                            <a-col :span="12">
                                <div>
                                    <a-upload v-model:fileList="fileList" :customRequest="uploadAvatar" :disabled="disableUploadAvatar" :showUploadList=false :maxCount=1> 
                                        <a-button>
                                            <upload-outlined></upload-outlined>
                                            上传新头像
                                        </a-button>
                                    </a-upload>
                                </div>
                            </a-col>
                        </a-row>
                    </div>
                    <div class="profile-item">
                        <p class="profile-item-title">用户名</p>
                        <p ></p>
                        <a-input v-model:value="username"/>
                    </div>
                    <div class="profile-item">
                        <p class="profile-item-title">以太坊地址</p>
                        {{ publicAddress }}
                    </div>
                    <div class="profile-item">
                        <p class="profile-item-title">Steam ID</p>
                        <form action="https://steamcommunity.com/openid/login" method="post">
                            <input type="hidden" name="openid.identity"
                                value="http://specs.openid.net/auth/2.0/identifier_select" />
                            <input type="hidden" name="openid.claimed_id"
                                value="http://specs.openid.net/auth/2.0/identifier_select" />
                            <input type="hidden" name="openid.ns" value="http://specs.openid.net/auth/2.0" />
                            <input type="hidden" name="openid.mode" value="checkid_setup" />
                            <input type="hidden" name="openid.realm" value="http://www.dust.com" />
                            <input type="hidden" name="openid.return_to" value="http://www.dust.com:81/bind-steam" />
                            <a-button html-type="submit">绑定steam</a-button>
                        </form>
                    </div>
                    <div class="profile-item">
                        <p class="profile-item-title">Steam API Key</p>
                        <a-input v-model:value="steamApiKey"/>
                    </div>
                    <div class="profile-item">
                        <p class="profile-item-title">Steam交易链接</p>
                        <a-input v-model:value="steamTradeUrl"/>
                    </div>
                </div>
                <a-button type="primary" block>保存</a-button>
            </div>
        </a-col>
        <a-col :span="9">
        </a-col>
    </a-row>
    <!-- <a-button type="primary" @click="userLogout">退出登录</a-button> -->
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';
import NavBar from '../components/NavBar.vue'
import { logout } from '../common/user'
import { cos } from '../common/cos'

export default defineComponent({
    components: {
        NavBar,
    },
    data() {
        return {
            username: '',
            avatarSrc: '',
            publicAddress: '',
            steamId: '',
            steamApiKey: '',
            steamTradeUrl: '',
            beforeUpload: () => false,
            disableUploadAvatar: false,
            maxCount: 1,
            showUploadList: false,
            fileList: []
        }
    },
    methods: {
        async uploadAvatar(request) {
            this.disableUploadAvatar = true
            await cos.putObject({
                Bucket: 'dust-test-1253732422',
                Region: 'ap-shanghai',
                Key: `avatar/${request.file.name}`,
                Body: request.file
            })
            const that = this
            cos.getObjectUrl({
                Bucket: 'dust-test-1253732422', /* 必须 */
                Region: 'ap-shanghai',     /* 存储桶所在地域，必须字段 */
                Key: `avatar/${request.file.name}`,  
                Sign: true           
            }, function (err, data) {
                that.avatarSrc = data.Url
            });
            this.disableUploadAvatar = false
            request.onSuccess()
        },
        userLogout() {
            logout()
            this.$router.push('/market')
        },
    },
    mounted: async function() {
        const response = await axios.get('/api/user/profile')
        const profile = response.data
        this.username = profile.name
        this.publicAddress = profile.publicAddress
        this.avatarSrc = profile.avatarUrl
        this.steamId = profile.steamId
        this.steamApiKey = profile.apiKey
        this.steamTradeUrl = profile.tradeUrl
    }
})
</script>

<style scoped>
.profile-title {
    margin-top: 50px;
}

.profile-item {
    margin-bottom: 20px;
}

.profile-item-title {
    font-weight: bold;
}
</style>

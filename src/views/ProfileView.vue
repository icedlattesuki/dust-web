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
                                    <a-avatar :size="64">
                                    <template #icon><UserOutlined /></template>
                                    </a-avatar>
                                </div>
                            </a-col>
                            <a-col :span="12">
                                <div>
                                    <a-upload :before-upload="beforeUpload">
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
                        <a-button>绑定steam</a-button>
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
import NavBar from '../components/NavBar.vue'
import { logout } from '../common/user'
import { UploadOutlined } from '@ant-design/icons-vue';


var username = 'Yusen'
var publicAddress = "0x123"

const beforeUpload = () => {
    return false
}

export default defineComponent({
    components: {
        NavBar,
        UploadOutlined
    },
    data() {
        return {
            username,
            beforeUpload,
            publicAddress
        }
    },
    methods: {
        userLogout() {
            logout()
            this.$router.push('/market')
        },
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

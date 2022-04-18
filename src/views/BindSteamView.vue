<template>
    <NavBar></NavBar>
    <a-space>
        <a-spin size="large" />
    </a-space>
</template>

<script>
import { defineComponent } from 'vue';
import NavBar from '../components/NavBar.vue'
import { logout } from '../common/user'
import { UploadOutlined } from '@ant-design/icons-vue';
import { cos } from '../common/cos'
// import axios from 'axios';
// import { Issuer } from 'openid-client';

var username = 'Yusen'
var publicAddress = "0x123"
var avatarSrc = ''
var disableUploadAvatar = false
const showUploadList = false
const maxCount = 1
var fileList = []

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
            publicAddress,
            avatarSrc,
            disableUploadAvatar,
            maxCount,
            showUploadList,
            fileList
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
        bindSteam() {
            // const steamIssuer = await Issuer.discover('https://steamcommunity.com/openid/');
            // console.log('Discovered issuer %s %O', steamIssuer.issuer, steamIssuer.metadata);
            // axios.get('/api/redirect')
            this.$router.push('/bind-steam')
        }
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

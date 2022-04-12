<template>
    <div class="navbar">
        <a-row type="flex" justify="center" align="middle">
            <a-col :span="8">
                <div class="logo">
                      <router-link to="/">
                            <!-- <dust-icon type="icon-shotgun" :style="logoStyle"/> -->
                            <a-image :src="logo" :width="90"/>
                      </router-link>
                </div>
            </a-col>
            <a-col :span="8"></a-col>
            <a-col :span="8"> 
                <a-menu v-model:selectedKey="market" mode="horizontal" class="menu">
                    <a-menu-item key="market">
                        <router-link to="/market">
                            <dust-icon type="icon-tabbar-market" :style="userIconStyle" />
                        </router-link>
                    </a-menu-item>
                    <a-menu-item key="repository">
                        <dust-icon type="icon-cangkuguanli" :style="userIconStyle" />
                    </a-menu-item>
                    <a-menu-item key="feedback">
                        <dust-icon type="icon-yijianfankui" :style="userIconStyle" />
                    </a-menu-item>
                    <a-menu-item key="user">
                        <router-link to="/profile" v-if="isLoggedIn">
                            <dust-icon type="icon-zhanghu" :style="userIconStyle" />
                        </router-link>
                        <router-link to="/login" v-else>
                            <dust-icon type="icon-zhanghu" :style="userIconStyle" />
                        </router-link>
                    </a-menu-item>
                </a-menu>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { defineComponent } from "vue"
import { isLoggedIn } from '../common/user'
import { DustIcon } from '../common/icon'
import logo from '../assets/logo.png'

const logoStyle = {}
logoStyle.fontSize = "80px"
const userIconStyle = {}
userIconStyle.fontSize = "25px"


export default defineComponent({
    components: {
        DustIcon
    },
    data() {
        return {
            logoStyle,
            userIconStyle,
            isLoggedIn: isLoggedIn(),
            logo
        }
    }
})
</script>

<style scoped>
.navbar {
    border-bottom-style: solid;
    border-bottom-width: 0.1px;
    padding-top: 10px;
    padding-bottom: 2px;
}

.logo {
    padding-left: 50px;
}

.menu {
    border-bottom-width: 0;
    margin-left: 55%;
}
</style>

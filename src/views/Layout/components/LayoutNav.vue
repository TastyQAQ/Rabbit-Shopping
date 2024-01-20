<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
const router = useRouter()

const userStore = useUserStore()
const logout = () => {
    userStore.clearUserInfo()
    router.push('/login')
}
</script>

<template>
    <nav class="app-topnav">
        <div class="container">
            <ul>
                <template v-if="userStore.userInfo.id">
                    <li>
                        <a href="javascript:;"><i class="iconfont icon-user"></i>{{ userStore.userInfo.account }}</a>
                    </li>
                    <li>
                        <el-popconfirm title="確定要登出嗎?" confirm-button-text="確定" cancel-button-text="取消" @confirm="logout">
                        <template #reference>
                            <a href="javascript:;">退出登入</a>
                        </template>
                        </el-popconfirm>
                    </li>
                    <li>
                        <a href="javascript:;">我的訂單</a>
                    </li>
                    <li>
                        <a href="javascript:;">會員中心</a>
                    </li>
                </template>
                <template v-else >
                    <li>
                        <a href="javascript:;" @click="router.push('/login')">請先登入</a>
                    </li>
                    <li>
                        <a href="javascript:;">幫助中心</a>
                    </li>
                    <li>
                        <a href="javascript:;">關於我們</a>
                    </li>
                </template>
            </ul>
        </div>
    </nav>
</template>

<style scoped lang="scss">
.app-topnav {
    background-color: #333;
    ul {
        display: flex;
        height: 53px;
        justify-content: flex-end;
        align-items: center;
        li {
            a {
                padding: 0 15px;
                color: #cdcdcd;
                line-height: 1;
                display: inline-block;
                i {
                    font-size: 14px;
                    margin-right: 2px;
                }

                &:hover {
                    color: $xtxColor;
                }
            }
            ~li {
                a {
                    border-left: 2px solid #666;
                }
            }
        }
    }
}
</style>
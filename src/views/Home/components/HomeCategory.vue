<script setup>
import { useCategoryStore } from '@/stores/category';
const categoryStore = useCategoryStore()
</script>

<template>
    <div class="home-category">
        <ul class="menu">
            <li v-for="item in categoryStore.categoryList" :key="item.id">
                <router-link to="/">{{ item.name }}</router-link>
                <router-link to="/" v-for="i in item.children.slice(0, 2)" :key="i.id">{{ i.name }}</router-link>
                <div class="layer">
                    <h4>分類推薦<small>根據您的購買紀錄或瀏覽紀錄推薦</small></h4>
                    <ul>
                        <li v-for="i in item.goods" :key="i.id">
                            <router-link to="/">
                                <img :src="i.picture" alt="">
                                <div class="info">
                                    <p class="name ellipsis">{{i.name}}</p>
                                    <p class="desc ellipsis-2">{{i.desc}}</p>
                                    <p class="price"><i>$</i>{{ i.price }}</p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.home-category {
    background-color: rgba(0, 0, 0, 0.8);
    width: 250px;
    height: 500px;
    position: relative;
    z-index: 99;
    .menu {
        li {
            padding-left: 40px;
            height: 50px;
            line-height: 50px;
            
            a {
                color: #fff;
                margin-right: 4px;
                &:first-child {
                    font-size: 16px;
                }
            }
            .layer {
                display: none;
                position: absolute;
                top: 0;
                left: 250px;
                width: 990px;
                height: 500px;
                background: rgba(255, 255, 255, 0.8);
                padding: 0 15px;
                h4 {
                    font-size: 20px;
                    font-weight: normal;
                    line-height: 80px;
                    small {
                        padding-left: 5px;
                        font-size: 16px;
                        color: #666;
                    }
                }
                ul {
                    display: flex;
                    flex-wrap: wrap;
                    li {
                        width: 310px;
                        height: 120px;
                        margin-right: 15px;
                        margin-bottom: 15px;
                        border: 1px solid #eee;
                        border-radius: 4px;
                        background: #fff;
                        &:nth-child(3n) {
                            margin-right: 0;
                        }
                        a {
                            display: flex;
                            width: 100%;
                            height: 100%;
                            align-items: center;
                            padding: 10px;
                            &:hover {
                                background: #e3f9f4;
                            }
                            img {
                                width: 95px;
                                height: 95px;
                            }
                            .info {
                                padding-left: 10px;
                                line-height: 24px;
                                overflow: hidden;
                                .name {
                                    font-size: 16px;
                                    color: #666;
                                }
                                .desc {
                                    color: #999;
                                }
                                .price {
                                    font-size: 22px;
                                    color: $priceColor;
                                    i {
                                        font-size: 16px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            &:hover {
                background-color: $xtxColor;
                .layer {
                    display: block;
                }
            }
        }
    }
}
</style>
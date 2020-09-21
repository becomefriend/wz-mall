<template>
    <div>
        <swiper :options="swiperOptions">
            <swiper-slide>
                <img class="w-100" src="../assets/image/8bb473cb0ffab06061bdecb7780b7fa1.jpeg" alt="">
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/image/9337403ad9152e9e38851c057e6b1b3d.jpeg" alt="">
            </swiper-slide>
            <swiper-slide>
                <img class="w-100" src="../assets/image/f957c0a79d7403fa93afeb59f995fb4c.jpeg" alt="">
            </swiper-slide>

        </swiper>
        <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
        <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
            <div class="d-flex flex-wrap">
                <div class="nav-item mb-3" v-for="n in 10" :key="n">
                    <i class="sprite sprite-news"></i>
                    <div class="py-2">爆料站</div>
                </div>

            </div>
            <div class="bg-light py-2 fs-sm d-flex ai-center jc-center">
                <i class="sprite sprite-arrow"></i>
                <span>收起</span>
            </div>
        </div>
        <!--      新闻详情-->
        <m-list-card icon="menu" title="新闻资讯" :categories="newsCats">

            <!--    接收子组件传过来的值-->
            <template #items="{category}">
                <router-link tag="div" :to="`/articles/${news._id}`" class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
                    <span class="text-info">[{{news.categoryName}}]</span>
                    <span class="px-2">|</span>
                    <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
                    <span class="text-grey-1 fs-sm">{{news.createdAt |date}}</span>
                </router-link>
            </template>

        </m-list-card>
        <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">

            <!--    接收子组件传过来的值-->
            <template #items="{category}">
               <div class="d-flex flex-wrap" style="margin:0 -0.5rem;">
                   <router-link tag="div" :to="`/heroes/${hero._id}`" class="p-2 text-center" style="width: 20%" v-for="(hero,i) in category.heroList" :key="i">
                       <img :src="hero.avatar" alt="" class="w-100">
                       <div>{{hero.name}}</div>
                   </router-link>
               </div>
            </template>

        </m-list-card>
    </div>
</template>

<script>

    import dayjs from 'dayjs'

    export default {
        filters: {
            date(val) {
                return dayjs(val).format('MM/DD')
            }
        },
        data() {
            return {
                swiperOptions: {
                    pagination: {
                        el: '.pagination-home',

                    },
                    autoplay: {delay: 2500, disableOnInteraction: false},

                    speed: 1000,
                    // Some Swiper option/callback...
                },
                newsCats: [],
                heroCats:[],

            };
        },
        methods: {
            async fetchNewsCats() {
                const res = await this.$http.get('news/list')
                this.newsCats = res.data
            },
            async fetchHeroCats() {
                const res = await this.$http.get('heroes/list')
                this.heroCats = res.data
            }
        },
        created() {
            this.fetchNewsCats()
            this.fetchHeroCats()
        }
    }
</script>
<style lang="scss">

    .pagination-home {
        opacity: 1;

        .swiper-pagination-bullet {
            border-radius: 0.1538rem;
            background-color: #fff;
        }

        .swiper-pagination-bullet-active {
            background-color: #4b67af;
        }
    }

    .nav-icons {
        border-top: 1px solid #4b67af;
        border-bottom: 1px solid #4b67af;

        .nav-item {
            width: 25%;
            border-right: 1px solid #4b67af;

            &:nth-child(4n) {
                border-right: none;
            }
        }

    }

</style>
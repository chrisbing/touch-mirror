<template>
    <section>
        <section class="wrapper">
            <div class="news" v-if="news">
                <div class="item" @click="showDetail(item)" v-for="item in news.items">{{ item.title }}</div>
            </div>

        </section>
        <transition name="module-fade">
            <section v-if="currentNews" class="detail-wrapper">
                <div class="detail">
                    <h1>{{ currentNews.title }}</h1>
                    <div class="module-news__content" v-html="currentNews.content"></div>
                </div>
                <div class="close" @click="currentNews = null"><i class="iconfont icon-close"></i></div>
            </section>
        </transition>
    </section>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { getNews } from '@/network'

function useNews() {
    const weather = ref(null)

    function updateNews() {
        getNews().then(({ data }) => {
            weather.value = data.data
        })
    }

    updateNews()
    setInterval(() => {
        updateNews()
    }, 1000 * 60 * 60)
    return weather
}

export default createComponent({
    setup() {
        const news = useNews()

        const currentNews = ref(null)
        const showDetail = (detail: any) => {
            currentNews.value = detail
        }

        return {
            news,
            showDetail,
            currentNews,
        }
    },
})
</script>

<style scoped lang="scss">
    .wrapper {
        position: absolute;
        top: 300px;
        right: 0;
        width: 50%;
        height: calc(50% - 300px);
        font-size: 24px;

        padding: 40px;

        .news {
            height: 100%;
            overflow: auto;

            .item {
                padding: 20px 0;
            }

        }
    }

    .detail-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #000000;
        padding: 80px 80px 140px;
        z-index: 999;

        .detail {
            overflow: auto;
            height: 100%;

            h1 {
                font-size: 50px;
                margin-bottom: 40px;
            }

        }

        .close {
            position: absolute;
            bottom: 50px;
            display: flex;
            width: 100%;
            left: 0;
            justify-content: center;
            align-items: center;


            .iconfont {
                font-size: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                /*border: 4px solid #ffffff;*/
                width: 60px;
                height: 60px;
                border-radius: 50%;

            }
        }
    }

</style>

<style lang="scss">
    .module-news__content {

        font-size: 34px;

        p {
            margin: 20px 0;
        }

        img {
            margin: 10px 10%;
            width: 80%;
        }

        a {
            color: #0991b9;
        }
    }

    .module-fade-enter-active {
        animation: module-fade-in 1.5s;

        .detail h1 {
            transition: all 0.5s 0.5s;
            opacity: 1;
            transform: translateY(0);
        }

        .module-news__content, .close {
            transition: all 0.5s 1s;
        }
    }

    .module-fade-leave-active {
        animation: module-fade-out 1.5s;

        .detail, .close {
            transition: all 0.5s;
        }
    }

    @keyframes module-fade-in {
        0% {
            opacity: 0;
        }

        33% {
            opacity: 1;
        }
    }

    @keyframes module-fade-out {
        0% {
            opacity: 1;
        }

        33% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }


    .module-fade-enter /* .fade-leave-active below version 2.1.8 */
    {

        .detail h1 {
            opacity: 0;
            transform: translateY(-10px);
        }

        .module-news__content, .close {
            opacity: 0;
            transform: translateY(-10px);
        }
    }

    .module-fade-leave-to {
        .detail, .close {
            opacity: 0;
        }
    }
</style>

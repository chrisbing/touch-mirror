<template>
    <section class="wrapper">
        <div class="news" v-if="news">
            <div class="item" v-for="item in news.items">{{ item.title }}</div>
        </div>
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
        return {
            news,
        }
    },
})
</script>

<style scoped lang="scss">
    .wrapper{
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

</style>

<template>
    <div class="news" v-if="news">
        <div v-for="item in news.items">{{ item.title }}</div>
    </div>
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
    .news {
        font-size: 24px;
    }
</style>

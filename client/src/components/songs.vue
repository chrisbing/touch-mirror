<template>
    <div class="weather" v-if="weather">
        <div v-for="item in weather.dailySongs">{{ item.name }}</div>
    </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { getRecommendSongs } from '@/network'

function useSongs() {
    const weather = ref(null)

    function updateSongs() {
        getRecommendSongs().then(({ data }) => {
            weather.value = data.data
        })
    }

    updateSongs()
    return weather
}

export default createComponent({
    setup() {
        const weather = useSongs()
        return {
            weather,
        }
    },
})
</script>

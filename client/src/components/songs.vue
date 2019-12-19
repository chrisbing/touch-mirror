<template>
    <div class="songs" v-if="weather">
        <div v-for="item in weather.tracks"><img :src="item.al.picUrl + '?param=200y200'" alt="">
            {{ item.name }}
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { getTopList } from '@/network'

function useSongs() {
    const weather = ref(null)

    function updateSongs() {
        getTopList(6).then(({ data }) => {
            weather.value = data.playlist
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

<style scoped lang="scss">
    .songs {
        font-size: 20px;
    }
</style>

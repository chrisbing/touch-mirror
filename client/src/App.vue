<template>
    <div id="app">
        {{ now | date('HH:mm:ss') }}
        <weather></weather>
        <news></news>
        <songs></songs>
    </div>
</template>

<script lang="ts">
import { createComponent, ref, onMounted } from '@vue/composition-api'
import weather from './components/weather.vue'
import news from './components/news.vue'
import songs from './components/songs.vue'

export default createComponent({
    setup() {
        const now = ref(new Date())
        let show = false
        onMounted(() => {
            setInterval(() => {
                show = !show
                now.value = new Date()
            }, 500)
        })

        return {
            now,
        }
    },
    components: {
        weather,
        news,
        songs,
    },
})
</script>

<style lang="scss">

</style>

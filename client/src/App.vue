<template>
    <div id="app">
        <div class="module-time">
            <div class="time">{{ now | date('HH:mm') }}</div>
            <div class="date">
                星期{{ '日一二三四五六'.split('')[now.getDay()] }}
                {{ now | date('YYYY.MM.DD') }}
            </div>
        </div>
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

    $height: 100px;
    $second-height: 40px;
    $gray: #aaaaaa;

    .module-time{
        position: absolute;
        /*width: 30%;*/
        text-align: center;
        top: 100px;
        left: 100px;

        .time {
            height: $height;
            line-height: $height;
            font-size: $height - 2px;
            margin-bottom: 20px;
        }

        .date{
            font-size: $second-height - 5px;
            line-height: $second-height - 4px;
            color: $gray;
        }
    }




</style>

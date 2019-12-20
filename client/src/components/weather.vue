<template>
    <div class="weather" v-if="weather">
        <div class="text">
            <div class="temp">
                {{weather.weather.wendu}}°
            </div>
            <div class="type">北京 {{ weather.weather.forecast[0].type }}</div>
        </div>
        <img src="https://dss1.bdstatic.com/5eN1bjq8AAUYm2zgoY3K/r/www/aladdin/img/new_weath/icon/1.png" alt="">
    </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { getWeather } from '@/network'

function useWeather() {
    const weather = ref(null)

    function updateWeather() {
        getWeather().then(({ data }) => {
            weather.value = data.data
        })
    }

    updateWeather()
    setInterval(() => {
        updateWeather()
    }, 1000 * 60 * 60)

    return weather
}

export default createComponent({
    name: 'weather',
    setup() {
        const weather = useWeather()
        return {
            weather,
        }
    },
})
</script>

<style scoped lang="scss">
    .weather {
        position: absolute;
        right: 0;
        top: 100px;
        display: flex;
        justify-content: center;
        width: 50%;

        .text {
            margin-right: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .temp {
                font-size: 70px;
                margin-bottom: 10px;
            }

            .type {
                font-size: 24px;
                color: #aaaaaa;
            }
        }

        img {
            width: 150px;
            height: 150px;
        }
    }
</style>

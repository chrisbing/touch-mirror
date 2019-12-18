<template>
    <div class="weather" v-if="weather">
        {{weather.weather.wendu}}℃
        <div>{{ weather.weather.forecast[0].type }}</div>
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
    setup() {
        const weather = useWeather()
        return {
            weather,
        }
    },
})
</script>

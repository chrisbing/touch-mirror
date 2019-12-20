<template>
    <div class="wrapper">
        <div class="songs" v-if="weather">
            <div class="item" v-for="(item, i) in weather.tracks" :class="i === 3 ? 'active' : ''">
                <img :src="item.al.picUrl + '?param=100y100'" alt="">
                <div class="title">{{ item.name }}</div>
                <div class="iconfont" :class="i === 3 ? 'icon-love' : 'icon-love-o'"></div>
            </div>
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

    .wrapper {
        position: absolute;
        top: 50%;
        left: 0;
        height: 50%;
        width: 100%;
        padding: 40px 20px;
    }
    .songs {
        width: 100%;
        height: 100%;
        overflow: auto;


        .item {
            display: flex;
            padding: 10px 20px;

            &.active {
                border: 3px solid transparent;
                border-image:linear-gradient(to right, #0991b9, #18cb9f) 1 10;
            }

        }

        img {
            border-radius: 15px;
            margin-right: 20px;
        }

        .title {
            font-size: 24px;
            flex: 1;
        }

        .iconfont {
            font-size: 30px;
        }

        .icon-love {
            color: #ff1233;
        }
    }
</style>

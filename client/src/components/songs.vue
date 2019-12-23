<template>
    <div class="wrapper">
        <div class="songs" v-if="songs">
            <div class="item" @click="selectSong(item)" v-for="(item, i) in songs.tracks"
                 :class="item.playing ? 'active' : ''">
                <img :src="item.al.picUrl + '?param=80y80'" alt="">
                <div class="info">
                    <div class="title">{{ item.name }}</div>
                    <div class="singer">{{ item.ar.map(x => x.name).join('/') }} - {{ item.al.name }}</div>
                </div>
                <div class="iconfont" :class="i === 3 ? 'icon-love' : 'icon-love-o'"></div>
            </div>
        </div>
        <div v-if="lastSelected" class="playing-song" :class="playing ? 'playing' : ''">
            <div class="left">
                <div class="pic">
                    <img :src="lastSelected.al.picUrl + '?param=300y300'" alt="">
                </div>
            </div>
            <div class="right">
                <div class="title">
                    <h2>{{ lastSelected.name }}</h2>
                    <div class="singer">{{ lastSelected.ar.map(x => x.name).join('/') }} - {{ lastSelected.al.name }}</div>
                </div>
                <!--                <div class="iconfont" :class="lastSelected.love ? 'icon-love' : 'icon-love-o'"></div>-->
            </div>
            <div class="progress">
                <div class="bar" :style="{ width: playingTime / lastSelected.dt * 100 * 1000 + '%' }"></div>
                <div class="bar-filter" :style="{ width: playingTime / lastSelected.dt * 100 * 1000 + '%' }"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import { getSongUrl, getTopList } from '@/network'
import Vue from 'vue'

function useSongs() {
    const songs = ref<any>(null)

    function updateSongs() {
        getTopList(6).then(({ data }) => {
            songs.value = data.playlist
        })
    }

    updateSongs()
    return songs
}

export default createComponent({
    setup() {
        const songs = useSongs()
        let audio: null | HTMLAudioElement = null
        let lastSelected = ref<any>(null)
        let playing = ref(false)
        let playingTime = ref(0)

        const selectSong = async (item: any) => {
            const { data } = await getSongUrl(item.id)
            Vue.set(item, 'url', data.data[0].url)

            if (audio) {
                audio.pause()
            }
            let value = lastSelected.value
            if (value) {
                value.playing = false
            }
            lastSelected.value = item

            audio = new Audio(data.data[0].url)


            let onProgress = () => {
                if (audio) {
                    playingTime.value = audio.currentTime
                }
            }

            let onAudioComplete = () => {
                if (songs.value) {
                    let index = songs.value.tracks.indexOf(lastSelected.value)
                    index = (index + 1) % songs.value.tracks.length
                    selectSong(songs.value.tracks[index])
                }
                if (audio) {
                    audio.removeEventListener('timeupdate', onProgress)
                    audio.removeEventListener('complete', onAudioComplete)
                }
            }

            audio.addEventListener('ended', onAudioComplete)
            audio.addEventListener('timeupdate', onProgress)
            await audio.play()
            playing.value = true
            Vue.set(item, 'playing', true)
        }

        return {
            songs,
            selectSong,
            lastSelected,
            playing,
            playingTime,
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
            padding: 20px 20px;
            border: 3px solid transparent;

            &.active {
                border-image: linear-gradient(to right, #0991b9, #18cb9f) 1 10;
            }

            .info {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .title {
                    font-size: 28px;

                }

                .singer {
                    color: #aaaaaa;
                    font-size: 24px;
                }
            }

        }

        img {
            border-radius: 15px;
            margin-right: 20px;
        }

        .iconfont {
            font-size: 30px;
        }

        .icon-love {
            color: #ff1233;
        }
    }

    .playing-song {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #000000;
        top: 0;
        left: 0;

        &.playing {
            img {
                animation: rotate 100s infinite linear;
            }

            @keyframes rotate {
                0% {
                    transform: rotate(0)
                }

                100% {
                    transform: rotate(360deg)
                }
            }
        }

        .left {
            position: absolute;
            left: 0;
            width: 50%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;

            .pic {
                position: absolute;
                top: 100px;
                width: 400px;
                height: 400px;
                background: repeating-radial-gradient(
                        circle,
                        rgba(255, 0, 0, 0) 1px,
                        rgba(0, 0, 0, 0.2) 2px,
                        rgba(0, 0, 0, 0.2) 4px,
                        rgba(255, 0, 0, 0) 5px,
                        rgba(255, 0, 0, 0) 7px),
                linear-gradient(45deg, #3e3e3e, #0d0d0d, #2b2b2b);
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                    border-radius: 50%;
                }
            }
        }

        .right {
            position: absolute;
            left: 50%;
            width: 50%;
            height: 100%;

            .title {
                position: absolute;
                top: 200px;
                width: 100%;
                font-size: 24px;
                padding-right: 20px;

            }


        }

        .progress {
            height: 4px;
            background: #2b2b2b;
            position: absolute;
            left: 40px;
            right: 40px;
            bottom: 300px;
            width: calc(100% - 80px);

            .bar{
                position: absolute;
                height: 4px;
                background: linear-gradient(to right, #0991b9, #18cb9f);
            }

            .bar-filter {
                height: 4px;
                position: absolute;
                background: linear-gradient(to right, #0991b9, #18cb9f);
                filter: blur(10px);
            }
        }



    }
</style>

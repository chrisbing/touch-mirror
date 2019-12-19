import net from './config'

export function getWeather() {
    return net.get('/api/getWeather')
}

export function getNews() {
    return net.get('/api/getNews')
}

export function getRecommendSongs() {
    return net.get('/api/recommend/songs')
}

export function getTopList(idx: number) {
    return net.get('/api/top/list', {
        params: {
            idx,
        },
    })
}



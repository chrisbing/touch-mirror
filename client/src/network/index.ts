import net from './config'

export function getWeather() {
    return net.get('http://localhost:3003/api/getWeather')
}

export function getNews() {
    return net.get('http://localhost:3003/api/getNews')
}

import {Middleware} from "koa";
import axios from 'axios'
import Parser from 'rss-parser'

let parser = new Parser()

export const getWeather: Middleware = async (ctx) => {
    const {data} = await axios.get('http://t.weather.sojson.com/api/weather/city/101010100')
    ctx.body = {
        code: 0,
        data: {
            weather: data.data,
            cityInfo: data.cityInfo
        }
    }
}

export const getRss: Middleware = async (ctx) => {
    const data = await parser.parseURL('https://www.ithome.com/rss/')
    console.log(data)
    ctx.body = {
        code: 0,
        data: data
    }
}

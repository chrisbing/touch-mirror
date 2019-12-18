import KoaRouter from 'koa-router'
import {
    getRss,
    getWeather,
} from "../controller";

const router = new KoaRouter()

router.get('/api/getWeather', getWeather)
router.get('/api/getNews', getRss)

export default router

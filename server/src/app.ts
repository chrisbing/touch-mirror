import Koa, {Middleware} from 'koa'

import KoaBody from 'koa-body'
import KoaStatic from 'koa-static'
import cors from '@koa/cors'
import session from 'koa-session'
import router from './router'
import restful from './middleware/koa-restful'

const server = new Koa()


server.use(async (ctx, next) => {
    console.log(`<- ${ctx.request.path}`)
    let start = new Date().getTime()
    await next()
    console.log(`-> ${ctx.request.path} ${ctx.response.status} ${new Date().getTime() - start}ms`)
})

server.keys = ['ws:!#@sdjklu'] // 一串乱码,  session 用的


server.use(KoaStatic('public'))
server.use(KoaStatic('../client/dist'))
server.use(session({
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 1000 * 60 * 30, // 半小时
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    /*store: {
        /!**
         * get session object by key
         *!/
        async get(key: string, maxAge) {
            let data = await redis.get(`OTHER_LUNA_PLATFORM_SESSION:${key}`);
            // console.log('get', `OTHER_LUNA_PLATFORM_SESSION_${key}`, data)
            return data && JSON.parse(data);
        },

        /!**
         * set session object for key, with a maxAge (in ms)
         *!/
        async set(key: string, sess, maxAge) {
            try {
                // console.log('set', `OTHER_LUNA_PLATFORM_SESSION_${key}`, sess)
                // Use redis set EX to automatically drop expired sessions
                await redis.set(`OTHER_LUNA_PLATFORM_SESSION_${key}`, JSON.stringify(sess), 'EX', (typeof maxAge === 'number' ? maxAge : (1000 * 60 * 30)) / 1000);
            } catch (e) {
            }
            return key;
        },

        /!**
         * destroy session for key
         *!/
        async destroy(key: string) {
            // console.log(`OTHER_LUNA_PLATFORM_SESSION:${key}`)
            // @ts-ignore
            return await redis.del(`OTHER_LUNA_PLATFORM_SESSION:${key}`);
        }
    }*/
}, server))

server.use(cors({
    credentials: true
}))
server.use(restful())
server.use(KoaBody({
    multipart: true,
    json: true,
}))
server.use(router.routes())
    .use(router.allowedMethods())

async function init() {
    const port = 3003
    await server.listen(port, () => {
        console.log('server started, listening :' + port)
    })
}


init().then()

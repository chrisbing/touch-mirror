import {Middleware, Context} from 'koa'

declare module 'koa' {
    interface BaseContext{
        e404(message: string): void
        e422(message: string): void
        e500(message: string): void
        e401(message: string): void
        e403(message: string): void
    }
}

export default function restful(options: {} = {}): Middleware {
    return async (ctx, next) => {
        try {
            ([404, 422, 500, 401, 403]).forEach((code) => {
                ctx['e' + code] = (message: string) => {
                    ctx.status = code
                    ctx.body = {
                        message,
                    }
                }
            })
            await next()
        } catch (e) {
            console.error(e)
            ctx.status = 500
            ctx.body = {
                message: e.message,
            }
        }
    }
}

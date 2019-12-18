declare module "koa-better-serve" {
    import {Middleware} from "koa"

    const KoaBetterServe: (root: string | Buffer, pathname: string | RegExp, options?: object) => Middleware

    export default KoaBetterServe
}

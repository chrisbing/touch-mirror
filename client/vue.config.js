module.exports = {

    chainWebpack(config) {
        config.module.rule('eslint').use('eslint-loader')
            .tap((arg) => {
                arg.fix = true
                return arg
            })
    },

}

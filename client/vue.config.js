module.exports = {
    publicPath: 'http://mirror.local.com/',
    chainWebpack(config) {
        config.module.rule('eslint').use('eslint-loader')
            .tap((arg) => {
                arg.fix = true
                return arg
            })
    },
    devServer: {
        historyApiFallback: false,
        proxy: {
            '/api': {
                target: 'http://localhost:3003',
            },
        },
    },

}

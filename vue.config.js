module.exports = {
    lintOnSave: false,
    // css预设器配置项
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'sass',
            patterns: []
        }
    },
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8001',//接口的前缀
                ws: true,//代理websocked
                changeOrigin: true,//虚拟的站点需要更管origin
                pathRewrite: {
                    '^/api': ''//重写路径
                }
            }
        }
    }
}

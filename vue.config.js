module.exports = {
    // 修改路径
    publicPath: './',
    //去除map文件
    productionSourceMap: false,
    // 合并webpack的打包配置
    configureWebpack: {
        // 忽略那些模块
        externals: {
            // 左边 模块的名字
            // 右边 模块暴露给开发者使用的名字
            vue: 'Vue',
            'vue-router': 'VueRouter',
            axios: 'axios',
            'element-ui': 'ELEMENT' //ElementUI Element  ELEMENT
        }
    }
}
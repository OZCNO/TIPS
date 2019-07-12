module.exports = {
  // 基本路径
  baseUrl: './',
  // 输出文件目录
  outputDir: 'dist',
  // webpack-dev-server 相关配置
  devServer: {
    port: 8888,
    proxy:{
      "/api":{
        target:"http://localhost:8888",
        changeOrigin:true,//允许跨域
        secure:false,
        ws:false,
        pathRewrite:{
          "^/api":"/api"
        }
      }
    }
  },
}

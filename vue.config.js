module.exports = {
  // 基本路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // webpack-dev-server 相关配置
  devServer: {
    // port: 8080,
    proxy:{
      //当服务器遇到以/bank开头的，就会在前面加上target
      "/bank":{
        target:"http://10.1.120.38:56666/DBServer1",
        changeOrigin:true,//允许跨域
        secure:false,
        ws:false,
        pathRewrite:{
          "^/bank":""//把bank替换为空，
        }
      },
      "/tax":{
        target:"http://10.1.120.38:56666/TipsServer",
        changeOrigin:true,//允许跨域
        secure:false,
        ws:false,
        pathRewrite:{
          "^/tax":""
        }
      },
      "/node":{
        target:"http://127.0.0.1:8888",
        changeOrigin:true,//允许跨域
        secure:false,
        ws:false
      }
    }
  },
}

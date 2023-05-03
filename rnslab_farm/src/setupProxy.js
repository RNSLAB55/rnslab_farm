const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        createProxyMiddleware(["/getNode","/getusers","/getNodes","/getUserNodes","/addNode",'/getStorage','/updateNodeType','/updateSetting'],{
            target : "http://localhost:3003",
            changeOrigin: true,
        })
    )
};
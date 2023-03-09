const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        createProxyMiddleware(["/getusers","/getNodes","/getUserNodes","/addNode"],{
            target : "http://localhost:3003",
            changeOrigin: true,
        })
    )
};
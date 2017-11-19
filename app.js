'use strict'
 
var Koa = require('koa');
var wechat  = require('./wechat/g');
var config = require('./config')
var reply = require('./wx/reply')
var app = new Koa();
app.use(wechat(config.wechat,reply.reply));
app.listen(8080);
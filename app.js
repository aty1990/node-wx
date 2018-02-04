'use strict'
var Koa = require('koa');
var wechat  = require('./wechat/g');
var config = require('./config')
var reply = require('./wx/reply')
var Wechat = require('./wechat/wechat')
const views = require('koa-views')
const router = require('koa-router')()
var app = new Koa();
var ejs = require("ejs")
app.use(views(__dirname + '/view', {
  extension: 'ejs'
}))

router.get('/movie', async (ctx, next) => {
	var wechatApi = new Wechat(config.wechat)
	var data = await wechatApi.fetchAccessToken()
	var access_token = data.access_token
	var ticketData = await wechatApi.fetchTicket(access_token)
	var ticket = ticketData.ticket
	var params = sign(ticket,"http://"+ctx.request.host+ctx.request.url)
  	await ctx.render('index', params)
})

app.use(router.routes(), router.allowedMethods())

var createNonce = function(){
	return Math.random().toString(36).substr(2,15)
}
var createTimestamp = function(){
	return parseInt(new Date().getTime()/1000,10)+""
}

var _sign = function(noncestr,ticket,timestamp,url){
	var params = [
		'noncestr='+ noncestr,
		'jsapi_ticket='+ ticket,
		'timestamp='+ timestamp,
		'url='+ url
	]
	var str = params.sort().join("&")
	var shasum = crypto.createHash('sha1')

	shasum.update(str)

	return shasum.digest('hex')
}
function sign(ticket,url){
	var noncestr = createNonce()
	var timestamp = createTimestamp()
	var signature = _sign(noncestr,ticket,timestamp,url)

	return {
		noncestr : noncestr,
		timestamp : timestamp,
		signature : signature
	}
}
app.use(async (ctx, next) => {
  	await next()
})
app.use(wechat(config.wechat,reply.reply));
app.listen(8080);
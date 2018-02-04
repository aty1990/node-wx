'use strict'
var sha1 = require('sha1')
var Koa = require('koa');
var getRowBody = require('raw-body')
var Wechat = require('./wechat')
var util = require('./util')
 
module.exports = function(opts,handler){
	var wechat = new Wechat(opts);
	return function *(next){
		var that = this;
	  	var token = opts.token;
	  	var signature = this.query.signature;
	  	var nonce = this.query.nonce;
	  	var timestamp = this.query.timestamp;
	  	var echostr = this.query.echostr;
	  	var str = [token,timestamp,nonce].sort().join(''); //按字典排序，拼接字符串
	  	var sha = sha1(str); //加密

	  	if(this.method === 'GET') {
	  		if(sha === signature ){
	  			this.body = echostr + ''
	  			return;
	  		}
	  		else{
	  			this.body = 'wrong'
	  			return;
	  		}
	  	}
	  	else if(this.method ==='POST'){
	  		if(sha !== signature){
	  			this.body = 'wrong'
	  			return false
	  		}
	  	}

	  	var data = yield getRowBody(this.req,{
	  		length : this.length,
	  		limit : '1mb',
	  		encoding : this.charset
	  	})

	  	var content = yield util.parseXMLAsync(data)

	 	var message = util.formatMessage(content.xml)

	  	this.weixin = message;

	  	yield handler.call(this,next);

	  	wechat.reply.call(this);
	}
}

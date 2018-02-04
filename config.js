'use strict'
 
var path = require('path')
var util = require('./libs/util');
var wechat_file = path.join(__dirname,'./config/wechat.txt');
var wechat_ticket_file = path.join(__dirname,'./config/wechat_ticket.txt');
 
var config = {
  	wechat:{
        appID:'wxe64a74307bc7a375', //填写你自己的appID
        appSecret:'5638217fa7ae240924d72cbe5b3c36b4', //填写你自己的appSecret
    	token:'imooc', //填写你自己的token
    	getAccessToken:function(){
    		return util.readFileAsync(wechat_file)
    	},
    	saveAccessToken: function(data){
    		return util.writeFileAsync(wechat_file,JSON.stringify(data));
    	},
        getTicket:function(){
            return util.readFileAsync(wechat_ticket_file)
        },
        saveTicket: function(data){
            return util.writeFileAsync(wechat_ticket_file,JSON.stringify(data));
        }
  	}
};
 
module.exports = config
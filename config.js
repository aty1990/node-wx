'use strict'
 
var path = require('path')
var util = require('./libs/util');
var wechat_file = path.join(__dirname,'./config/wechat.txt');
 
var config = {
  	wechat:{
    	appID:'wxda28abdd85f6bbff', //填写你自己的appID
    	appSecret:'44216f77dc40ca2615d477b558b1b675', //填写你自己的appSecret
        //appID:'wxe64a74307bc7a375', //填写你自己的appID
        //appSecret:'5638217fa7ae240924d72cbe5b3c36b4', //填写你自己的appSecret
    	token:'hngx', //填写你自己的token
    	getAccessToken:function(){
    		return util.readFileAsync(wechat_file)
    	},
    	saveAccessToken: function(data){
    		return util.writeFileAsync(wechat_file,JSON.stringify(data));
    	}
  	}
};
 
module.exports = config
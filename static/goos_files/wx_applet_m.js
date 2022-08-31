
/*获取域名限制*/
function getUrlParam(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r!=null) return unescape(r[2]); return null; //返回参数值
};
//设置cookie
function wxSetCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())  +";path=/;domain=jiuxian.com";
}
//获取cookie
function wxGetCookie(name){
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null){
        return unescape(arr[2]);
    }else{
        return null;
    }
}
/***微信小程序访问页面处理start***/
wx.miniProgram.getEnv(function(res) {
    if(res.miniprogram){
        $(function(){
            try{
                //隐藏红色页头
                $(".publicHead").hide();
                $(".eleven").css('padding-top','0');
                //隐藏app下载按钮
                $("#appdownload").hide();
            }catch(err){
            }
        })

        //获取登录并且保存到cookie
        var appletToken = getUrlParam('token');
        if(appletToken != undefined && appletToken != ''){
            wxSetCookie('token',appletToken);
        }else if(appletToken != undefined && appletToken == ''){
            wxSetCookie('token','');
        }
    }
})

wx.miniProgram.getEnv(function(res) {
    if(res.miniprogram){
        //跳转判断
        $("a").live('click',function(){
            var $this = $(this);
            var thisHref = $this.attr('href');
            //跳转到详情页
            var viewIndex = thisHref.indexOf('/goods/view/');
            if(viewIndex > -1){
                var proId = thisHref.substring(viewIndex+12)
                wx.miniProgram.navigateTo({
                    url:'/pages/details/detail/detail?proId=' + proId
                });
                return false;
            }

            //跳转到拼团商品详情页
            var ptViewIndex = thisHref.indexOf('/goods/detail/');
            if(ptViewIndex > -1){
                var pt_endIndex = thisHref.indexOf('.htm'),
                    ptProId = thisHref.substring(ptViewIndex+14);
                if (pt_endIndex > -1){
                    ptProId = thisHref.substring(ptViewIndex+14,pt_endIndex);
                }
                wx.miniProgram.navigateTo({
                    url:'/pages/pintuan/pintuan_detail/detail/detail?proId=' + ptProId
                });
                return false;
            }

            //shop页面http替换为https
            var isShopHttp = thisHref.indexOf('https://shop.jiuxian.com');
            if(isShopHttp > -1){
                var linkStr = thisHref.replace('http:','https:')
                window.location.href = linkStr;
                return false;
            }

            //直接领券登录判断
            var loginToken = wxGetCookie('token');	//获取登录状态
            var isGetCoupon = thisHref.indexOf('/get_coupon');
            if(isGetCoupon > -1){
                if(loginToken=='' || loginToken==null || loginToken==undefined){
                    //若每天获取到token，跳转到小程序登录
                    toAppLogin();
                    return false;
                }
            }

            //跳转到领券中心
            var isGet_bonus = thisHref.indexOf('/get_bonus/');
            if(isGet_bonus > -1){
                if(loginToken=='' || loginToken==null || loginToken==undefined){
                    //若每天获取到token，跳转到小程序登录
                    toAppLogin();
                }else{
                    //若每天获取到token，跳转到小程序领券中心
                    wx.miniProgram.navigateTo({
                        url:'/pages/coupons/coupons'
                    });
                }
                return false;
            }
        })
        //跳转到小程序登录
        function toAppLogin(){
            wx.miniProgram.navigateTo({
                url:'/pages/user/login_way/login_way?loginFrom=webviewPage&url='+document.location.href,
                success: function(){
                    console.log('success')
                },
                fail: function(){
                    console.log('fail');
                }
            });
        }
    }
})

/***微信小程序访问页面处理end***/
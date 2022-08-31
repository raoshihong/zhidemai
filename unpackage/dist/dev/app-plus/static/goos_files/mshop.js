(function($) {
	window.rootUrl = window.root_url;
	// 线上微信链接
	window.wxCheckOutUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd647a6f7a600fa8f&redirect_uri=http%3a%2f%2fm.jiuxian.com%2fm_v1%2fcart%2fcheck_out%3fplatfrom%3dweixin&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
	window.voteIndexUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd647a6f7a600fa8f&redirect_uri=http%3a%2f%2fm.jiuxian.com%2fm_v1%2fvotewx%2findex&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
	window.voteDetailUrl1 = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd647a6f7a600fa8f&redirect_uri=http%3a%2f%2fm.jiuxian.com%2fm_v1%2fvotewx%2fdetail%3fproId%3d";
	window.voteToWap = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd647a6f7a600fa8f&redirect_uri=http%3a%2f%2fm.jiuxian.com%2fm_v1%2fweixin_jx%2fgetReturnUrl%2fa&response_type=code&scope=snsapi_base&state=123#wechat_redirect";

	window.voteDetailUrl2 = "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
	window.mshop = {
		rootUrl : window.rootUrl,
		staUrl : window.rootUrl + "/mjava_statics",
		dynUrl : window.rootUrl + "/m_v1",
		dataUrl : window.rootUrl + "/m_v1",
		rootUrlWith_v1:window.rootUrl + "/m_v1",
        memberUrl:window.memberUrl,
		universalLinkUrl : window.universalLinkUrl,
		ajaxJson : function(url, data, fun, type) {
			jQuery
					.ajax({
						contentType : "application/x-www-form-urlencoded; charset=utf-8",
						dataType : 'json',
						url : url,
						type : type || 'GET',
						data : data || {},
						success : function(data) {
							if (data.success) {
								sucFun.call(null, data);
							} else {
								alert("操作失败：" + data.errMessage);
							}
						}
					});
		},
		ajaxPage : function(url, data, sucfun, errfun, type) {
			jQuery
					.ajax({
						contentType : "application/x-www-form-urlencoded; charset=utf-8",
						dataType : 'html',
						url : url,
						type : type || 'GET',
						data : data || {},
						success : function(page) {
							if (data.success && sucfun) {
								sucFun.call(page);
							} else {
								if (errfun) {
									errfun.call(page);
								}
							}
						}
					});
		}
	};
	// 为立刻下载的按钮绑定事件
	// $('#openApp').attr('onclick', 'jxMlink()');
})(jQuery);

/**
 * 获取需要跳转的URL
 */
function getSkipUrl(linkUrl) {

	$.ajax({
		type : "get",
		url : window.mshop.dynUrl + '/applink/setSkipUrl.do?url=' + linkUrl
				+ '&t=' + new Date().getTime(),
		success : function(data) {
			var userAgentInfo = navigator.userAgent.toLowerCase();
			if (userAgentInfo.indexOf("android") > 0) {
				window.location.href = window.mshop.dynUrl + '/applink/getandroid.do?t=' + new Date().getTime();
                //window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jiuxianapk.ui";
			}
		}
	});
}

/**
 * 
 * @param linkUrl
 */
function jxMlink(linkUrl) {

    //__ozfaj2(detail_lijixiazai");
	if (!linkUrl || linkUrl == "") {
		linkUrl = window.location.href;
	}
    //兼容终端不支持后边的"/"和带"?参数"
    if(linkUrl == (window.rootUrl + "/") || linkUrl.indexOf(window.rootUrl + "?") > -1 || linkUrl.indexOf(window.rootUrl + "/?") > -1){
        linkUrl = window.rootUrl;
    }
	var userAgentInfo = navigator.userAgent.toLowerCase();
	if (userAgentInfo.indexOf("android") > 0) {
		setTimeout(function() {
			getSkipUrl(linkUrl);
		}, 1000);
		window.location.href = "jiuxian://app/link?param=" + linkUrl;
	} else if (userAgentInfo.indexOf("iphone") > 0) {
		getSkipUrl(linkUrl);
		window.location.href = window.realMisc + "/universallink?param="+ linkUrl;
	} else {
		window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.jiuxianapk.ui";
	}
}

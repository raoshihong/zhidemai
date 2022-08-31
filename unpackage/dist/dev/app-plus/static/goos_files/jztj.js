//九章统计
var jz_userId = $("#jz_userId").val();
if (jz_userId == 0) {
	jz_userId = "";
}
(function(d) {
	window._JX_INFO = window._JX_INFO || [];
	_JX_INFO.push([ "userId", jz_userId ]);
	_JX_INFO.push([ "clientId", "10001" ]);
	var s = d.createElement("script");
	s.type = "text/javascript";
	s.async = true;
	s.src = location.protocol + "//misc.jiuxian.com/js/visittrack.min.js";
	var s0 = d.getElementsByTagName("script")[0];
	s0.parentNode.insertBefore(s, s0);
})(document);

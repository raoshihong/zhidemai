// 直接对外暴露一个函数
export default (params)=>{
	uni.showLoading({
		title:"加载中..."
	})
	// 这个函数返回一个Promised对象,并传递一个回调函数
	return new Promise((resolve,reject)=>{
		uni.request({
			// url: '',
			// method: 'GET',
			// data: {},
			...params,
			success: res => {resolve(res)},
			fail: (err) => {reject(err)},
			complete: () => {
				// 成功和失败都会调用complete
				uni.hideLoading()
			}
		});
	})
}
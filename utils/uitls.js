// 定义一个工具对象
const Utils = {
	isNotEmpty:function(items){
		return items != undefined && items.length > 0
	}
}

// 将这个工具类暴露出去
export default Utils

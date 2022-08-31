<template>
	<view>
		<view class="home_tab">
			<view class="home_tab_title">
				<view class="home_tab_log">
					<image class="tab_log_img" src="../../static/icons/1024x1024.png"></image>
				</view>
				<view class="title_inner">
					<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text"
						activeColor="#d81e06"></uni-segmented-control>
				</view>
				<view class="iconfont icon-jiahao-copy"></view>
			</view>
			<view class="home_tab_content">
				<view v-if="current === 0">
					<tuijian></tuijian>
				</view>
				<view v-if="current === 1">
					<!-- <guanzhu></guanzhu> -->
				</view>
				<view v-if="current === 2">
					<shenghuo></shenghuo>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				items: ['推荐','关注',  '生活'],
				current: 0
			}
		},
		methods:{
			onClickItem(e) {
			      if (this.current != e.currentIndex) {
			        this.current = e.currentIndex;
			      }
			    }
		}
		// ,
		// vue声明周期的onLoad方法
		// onLoad() {
		// 	// this表示的就是vue的对象,因为request挂在在Vue的proptotype上,所以所有的vue对象共享
		// 	this.request({
		// 		url:"http://localhost:8000/test/test"
		// 	}).then(res=>{
		// 		console.log(res)
		// 	})
		// }
	}
</script>

<style lang="scss">
.home_tab{
	.home_tab_title{
		// 设置整个title部分相对父元素相对定位
		position: relative;
		.home_tab_log{
			width: 10%;
			.tab_log_img{
				position: absolute;
				margin: auto 15upx;
				top: 0;
				bottom: 0;
				width: 60upx;
				height: 60upx;
			}
		}
		.title_inner{
			width: 50%;//设置宽度
			margin: 0 auto;// 上下0边距,左右居中
		}
		.icon-jiahao-copy{
			// 设置绝对定位,只有设置position为absolute,top这些才有效果,且父元素必须设置为relative,否则相对与整个父元素
			position: absolute;
			top: 50%;
			right: 5%;// 向右距离父元素5%
			transform: translateY(-50%);//y轴平移
		}
	}
	.home_tab_content{}
}
</style>

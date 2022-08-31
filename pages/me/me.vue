<template>
	<view class="me_content">
		<view class="me_header">
			<uni-nav-bar class="me_nav"  :fixed="true" :statusBar="true" :border="false">
				<view class="me_header_left" slot="left">
					<image src="../../static/me/默认头像.png"></image>
				</view>
				<view class="me_header_default">
					<view>我的</view>
				</view>
				<view class="me_header_right" slot="right">
					<text class="iconfont icon-shezhi"></text>
					<text class="iconfont icon-xiaoxi"></text>
				</view>
			</uni-nav-bar>
		</view>
		<view class="me_info">
			<image src="../../static/me/默认头像.png"></image>
			<text>登陆/注册</text>
			<text class="iconfont icon-jinrujiantou"></text>
		</view>
		<view class="me_order">
			<view class="me_order_item" v-for="(order,index) in orderList" :key="index">
				<image :src="order.icon"></image>
				<view class="me_order_item_title">{{order.title}}</view>
			</view>
		</view>
		<view class="me_cash">
			<view class="me_cash_item" >
				<view>0.00</view>
				<view class="me_cash_item_title">返现</view>
			</view>
			<view class="me_cash_item" >
				<view>0</view>
				<view class="me_cash_item_title">优惠券</view>
			</view>
			<view class="me_cash_item" >
				<view>0</view>
				<view  class="me_cash_item_title">金币</view>
			</view>
			<view class="me_cash_item" >
				<view>0.00</view>
				<view class="me_cash_item_title">津贴</view>
			</view>
			<view class="me_cash_item">
				<image src="../../static/me/钱包.png"></image>
				<view>钱包明细</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList:[
					{
						"title":"待付款",
						"icon":"../../static/me/首页-待付款.png"
					},
					{
						"title":"待发货",
						"icon":"../../static/me/待发货.png"
					},
					{
						"title":"待收货",
						"icon":"../../static/me/3.1待收货.png"
					},
					{
						"title":"待评价",
						"icon":"../../static/me/3.1待评价.png"
					},
					{
						"title":"全部订单",
						"icon":"../../static/me/全部订单.png"
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.me_content{
	background-color: #EEEEEE;
	height: calc(100vh);
	.me_header{
		.me_nav{
			.me_header_left{
				image{
					width: 50upx;
					height: 50upx;
				}
			}
			.me_header_default{
				text-align: center;
				width: 100%;
				line-height: 84upx;
			}
			.me_header_right{
				.icon-shezhi{
					margin-right: 20upx;
				}
			}
		}
	}
	.me_info{
		// background-color: #000000;
		margin-top: 20upx;
		margin-left: 20upx;
		margin-right: 20upx;
		image{
			background-color: #FFFFFF;
			width: 100upx;
			height: 100upx;
			vertical-align: middle;
			border-radius: 100upx;
			margin-right: 20upx;
		}
		// color: #FFFFFF;
		font-size: 25upx;
	}
	.me_order{
		background-color: #FFFFFF;
		padding: 20upx;
		display: flex;
		justify-content: space-around;
		margin-top: 20upx;
		margin-left: 20upx;
		margin-right: 20upx;
		border-radius: 10upx;
		.me_order_item{
			text-align: center;
			image{
				width: 40upx;
				height: 40upx;
			}
			.me_order_item_title{
				font-size: 20upx;
			}
		}
	}
	.me_cash{
		background-color: #FFFFFF;
		padding: 20upx;
		display: flex;
		justify-content: space-around;
		margin-top: 20upx;
		margin-left: 20upx;
		margin-right: 20upx;
		border-radius: 10upx;
		.me_cash_item{
			text-align: center;
			font-size: 20upx;
			image{
				width: 40upx;
				height: 40upx;
			}
			.me_cash_item_title{
				margin-top: 15upx;
			}
		}
	}
}
</style>

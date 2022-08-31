<template>
	<view class="shopcar_content">
		<view class="shopcar_header">
			<uni-nav-bar class="shopcar_nav" background-color="#FC5A5A"  :fixed="true" :statusBar="true" :border="false">
				<view class="shopcar_header_left" slot="left">
				</view>
				<view class="shopcar_header_default">
					<view>购物车</view>
				</view>
				<view class="shopcar_header_right" slot="right">
					<view v-if="carData.shopItems != undefined && carData.shopItems.length>0">编辑</view>
				</view>
			</uni-nav-bar>
		</view>
		<scroll-view class="shopcar_scroll" :scroll-y="true" :enable-flex="true">
		<view class="shopcar_title" v-if="carData.title != undefined">
			<text class="shopcar_title_text">
				<text class="iconfont icon-chakantiezigengduojubao-copy"></text>
				{{carData.title}}
				<text class="iconfont icon-guanbi"></text>
			</text>
		</view>
		<view class="shopcar_list">
			<view class="shopcar_item" v-for="(shopItem,index) in carData.shopItems" :key="shopItem.shopId">
				<view class="shop_car_item_dianpu">
					<view class="shop_car_item_dianpu_info">
						<fui-checkbox class="shop_car_item_dianpu_check" :checked="true" value="1" color="#FC5A5A"
							borderColor="#B2B2B2">
						</fui-checkbox>
						<text class="shop_car_item_dianpu_name">{{shopItem.shopName}}</text>
						<text class="iconfont icon-jinrujiantou-copy"></text>
					</view>
					<view class="shop_car_item_product_list" v-for="(sku,index) in shopItem.skus" :key="sku.id">
						<view class="shop_car_product_item" v-for="(product,index) in sku.productItemList" :key="product.productId">
							<fui-checkbox class="shop_car_product_item_check" :checked="true" value="1" color="#FC5A5A"
								borderColor="#B2B2B2">
							</fui-checkbox>
							<image :src="product.imgUrl"></image>
							<view class="shop_car_product_info">
								<view class="shop_car_product_name">{{product.productName}}</view>
								<view class="shop_car_product_labels">
									<text class="shop_car_product_label" v-for="(label,index) in sku.labels">{{label.name}}</text>
								</view>
								<view class="shop_car_product_price_num">
									<view class="shop_car_product_price">¥{{product.price}}</view>
									<view class="shop_car_product_num">
										<text v-if="product.alert != undefined">{{product.alert.alertInfo}}</text>
										<uni-number-box :value="sku.num" ></uni-number-box>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		</scroll-view>
		<view class="shopcar_toolbar" v-if="carData.totalPrice != undefined">
			<view class="shopcar_toolbar_check">
				<fui-checkbox class="shop_car_item_dianpu_check" :checked="true" value="1" color="#FC5A5A"
					borderColor="#B2B2B2">
				</fui-checkbox>
				<text class="fui-text">全选</text>
			</view>
			<view class="shopcar_toolbar_price_btn">
				<view class="shopcar_toolbar_price">
					<view class="shopcar_toolbar_price_total">
						<text class="shopcar_toolbar_price_total_label">合计:</text>
						<text class="shopcar_toolbar_price_total_value">¥{{carData.totalPrice==undefined?0:carData.totalPrice}}</text>
					</view>
					<view class="shopcar_toolbar_price_minus">
						<text class="shopcar_toolbar_price_minus_label">共减:</text>
						<text class="shopcar_toolbar_price_minus_value">¥{{carData.discountPrice==undefined?0:carData.discountPrice}}</text>
					</view>
				</view>
				<view>
					<button class="mini-btn" type="primary" size="mini">
						去结算<text>({{carData.totalNum==undefined?0:carData.totalNum}})</text>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				carData:{
					title:',',
					shopItems:[],
					totalNum:0,
					totalPrice:0
				},
				checkshops:[0]
			}
		},
		methods: {
			
		},
		onShow() {
			this.request({
				url:"https://newappcart.jiuxian.com/shoppingcart/get.htm?apiVersion=1.0&appKey=948998E9-F6C0-452E-A57C-222AA1875E1C&appVersion=9.0.13&areaId=708&channelCode=0%2C1&cityName=%E6%B7%B1%E5%9C%B3%E5%B8%82&cpsId=appstore&deviceIdentify=B243531B-7EB8-4539-AB1F-D6FC9E8E071D&deviceType=IPHONE&deviceTypeExtra=0&equipmentType=iPhone&lati=22.69151231553819&longi=113.8075759548611&netEnv=WIFI&pushToken=e944d92184659d4cca277f3c1d6e2315a790e1297d1015cc711408b95dc30761&screenReslolution=414.00x896.00&supportWebp=1&sysVersion=15.1"
			}).then(res=>{
				console.log("购物车数据",res);
				this.carData = res.data.result
			})
		}
	}
</script>

<style lang="scss" scoped>
.shopcar_content{
	background-image: linear-gradient(#FC5A5A 10%, #F1F1F1 60%);
	.shopcar_header{
		background-color: #FC5A5A;
		.shopcar_nav{
			.shopcar_header_left{}
			.shopcar_header_default{
				color: #FFFFFF;
				font-size: 40upx;
				font-weight: 500;
				text-align: center;
				width: 100%;
				line-height: 84upx;
			}
			.shopcar_header_right{
				font-size: 30upx;
				color: #FFFFFF;
			}
		}
	}
	.shopcar_scroll{
		top:40px;
		position:absolute;
		// z-index:10;
		bottom:84upx;
			
		background-image: linear-gradient(#FC5A5A 10%, #F1F1F1 60%);
		.shopcar_title{
			margin-top: 20upx;
			text-align: center;
			.shopcar_title_text{
				color: #FFFFFF;
				border-radius: 10upx;
				padding: 0 10upx;
				background-color: #CC0001;
				font-size: 25upx;
				.icon-chakantiezigengduojubao-copy{
					margin-right: 10upx;
					width: 10upx;
					font-size: 20upx;
				}
				.icon-guanbi{
					margin-left: 20upx;
					font-size: 20upx;
				}
			}
			
		}
		.shopcar_list{
			// background-color: #F0F0F0;
			padding: 20upx;
			.shopcar_item{
				background-color: #FFFFFF;
				border-radius: 20upx;
				margin-top: 20upx;
				padding: 20upx 10upx;
				.shop_car_item_dianpu{
					padding: 0 10upx;
					.shop_car_item_dianpu_info{
						.shop_car_item_dianpu_check{
							margin-right: 20upx;
						}
						.shop_car_item_dianpu_name{
							font-size: 25upx;
							font-weight: 500;
						}
					}
					.shop_car_item_product_list{
						margin-top: 30upx;
						.shop_car_product_item{
							display: flex;
							.shop_car_product_item_check{
								margin-right: 20upx;
								align-self: center;
							}
							image{
								width: 150upx;
								height: 150upx;
							}
							.shop_car_product_info{
								width: 100%;
								margin-left: 20upx;
								.shop_car_product_name{
									font-size: 25upx;
								}
								.shop_car_product_labels{
									margin-top: 10upx;
									font-size: 20upx;
									color: #FFFFFF;
									.shop_car_product_label{
										background-color: #FC5A5A;
										border-radius: 20upx;
										padding: 0upx 10upx;
										margin-right: 10upx;
									}
								}
								.shop_car_product_price_num{
									margin-top: 10upx;
									display: flex;
									justify-content: space-between;
									align-items:center;
									.shop_car_product_price{
										font-size: 25upx;
										color: #FC5A5A;
									}
									.shop_car_product_num{
										align-items:center;
										display: flex;
										font-size: 20upx;
										color: #FC5A5A;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	.shopcar_toolbar{
		position:absolute;
		    // z-index:200;
		bottom:0;
		width: 100%;
		padding-left: 20upx;
		height: 84upx;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		.shopcar_toolbar_check{
			width: 150upx;
			font-size: 25upx;
			.fui-text{
				margin-left: 10upx;
			}
		}
		.shopcar_toolbar_price_btn{
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			.shopcar_toolbar_price{
				.shopcar_toolbar_price_total{
					font-size: 20upx;
					font-weight: 500;
					.shopcar_toolbar_price_total_label{
						
					}
					.shopcar_toolbar_price_total_value{
						color: #FC5A5A;
					}
				}
				.shopcar_toolbar_price_minus{
					font-size: 10upx;
					.shopcar_toolbar_price_minus_label{}
					.shopcar_toolbar_price_minus_value{}
				}
			}
			.mini-btn{
				background-color: #FF5A5F;
				font-size: 30upx;
				margin-right: 40upx;
				border-radius: 40upx;
				padding: 0upx 50upx;
			}
		}
	}
}
</style>

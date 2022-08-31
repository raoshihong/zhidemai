<template>
	<view class="shopinfo_content">
		<uni-nav-bar leftWidth="150upx">
			<view slot="left">
				<view>
					<text class="iconfont icon-fanhui"></text>
					<text class="iconfont icon-dingwei_white"></text>
					<text>历史选</text>
				</view>
			</view>
			<view></view>
			<view slot="right">
				<view>
					<text class="iconfont icon-sousuo-copy"></text>
					<text class="iconfont icon-fenxiang"></text>
				</view>
			</view>
		</uni-nav-bar>
		<view class="shopInfo_detail">
			<view class="shopInfo_headImage"><image :src="shopInfo.headImage"></image></view>
			<view class="shopInfo_name_time">
				<view class="shopInfo_name">
					{{shopInfo.name}}
				</view>
				<view class="shopInfo_deliveryTime">
					配送时间: {{shopInfo.deliveryTimeStart}}-{{shopInfo.deliveryTimeEnd}}
				</view>
				<view class="shopInfo_secondTitle">
					{{shopInfo.secondTitle}}
				</view>
			</view>
		</view>
		<view class="shopInfo_category_productList">
			<view class="shopInfo_category_productList_tabs">
				<view class="shopInfo_category_productList_tabs_home">首页</view>
				<view class="shopInfo_category_productList_tabs_prod">全部商品</view>
				<view class="shopInfo_category_productList_tabs_shangjia">商家</view>
			</view>
			<view class="shopInfo_category_productList_scroll">
				<view class="shopInfo_scroll_left">
					<scroll-view class="category" :scroll-y="true">
						<view class="category_item" 
						 v-for="(category,index) in categoryList" 
						 :key="index"
						 :class="index == tapCurrentCategoryIndex?'category_item_selected':''">
							<text @tap="changeCategory(category,index)">{{category.name}}</text>
						</view>
					</scroll-view>
				</view>
				<view class="shopInfo_scroll_right">
					<view class="product_labels">
						<text  
						v-for="(childCategory,index) in childCategorys" 
						:key="index"
						:class="index==currentLabelIndex?'product_label_selected':'product_label'"
						@tap="changeLabe(childCategory,index)">
						{{childCategory.name}}
						</text>
					</view>
					<view class="product_sort">
						<view >综合</view>
						<view >销量</view>
						<view >价格</view>
					</view>
					<view class="product_type">
						白兰地
					</view>
					<scroll-view class="productList">
						<view class="product_item" v-for="(product,index) in products" :key="product.id">
							<view class="product_listImage">
								<image :src="product.listImagePath"></image>
							</view>
							<view>
								<view>{{product.name}}</view>
								<view>
									<view>¥{{product.nowPrice}}</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				shopId:-1,
				shopInfo:{},
				categoryList:[],
				product_label:false,
				product_label_selected:true,
				childCategorys:[],
				tapCurrentCategoryIndex:0,
				currentLabelIndex:0,
				products:[]
			}
		},
		methods: {
			loadShopInfo(){
				this.request({
					url:"https://newappproduct.jiuxian.com/shop/home.htm?apiVersion=1.0&appKey=40F5A668-75BA-426B-A061-0E87747884EB&appVersion=9.0.12&areaId=708&channelCode=0%2C1&cityName=%E6%B7%B1%E5%9C%B3%E5%B8%82&cpsId=appstore&deviceIdentify=40F5A668-75BA-426B-A061-0E87747884EB&deviceType=IPHONE&deviceTypeExtra=0&equipmentType=iPhone&lati=22.69145968967014&longi=113.8075116644965&netEnv=WIFI&pushToken=99afd004c81de8025248532ebf58ff4de2c7274741284af9f4388a58768822c8&screenReslolution=414.00x896.00&supportWebp=1&sysVersion=15.1",
					data:{
						shopId:this.shopId
					}
				}).then(res=>{
					console.log("店铺详情:",res.data)
					this.shopInfo = res.data.result.shopInfo;
					this.categoryList = res.data.result.categoryList;
					
					if(this.utils.isNotEmpty(this.categoryList)){
						this.childCategorys = this.categoryList[0].childCategorys;
					}
				})
			}
			,changeCategory(category,index){
				console.log("当前分类",index,category)
				this.childCategorys = category.childCategorys;
				this.tapCurrentCategoryIndex = index;
				this.currentLabelIndex = 0;
				this.getProductList();
			}
			,changeLabe(childCategory,index){
				this.currentLabelIndex = index;
				this.getProductList();
			},
			getProductList(){
				this.request({
					url:"https://newappproduct.jiuxian.com/shop/goodsList.htm?apiVersion=1.0&appKey=40F5A668-75BA-426B-A061-0E87747884EB&appVersion=9.0.12&areaId=708&channelCode=0%2C1&cityName=%E6%B7%B1%E5%9C%B3%E5%B8%82&cpsId=appstore&deviceIdentify=40F5A668-75BA-426B-A061-0E87747884EB&deviceType=IPHONE&deviceTypeExtra=0&equipmentType=iPhone&lati=22.69145968967014&longi=113.8075116644965&netEnv=WIFI&pushToken=99afd004c81de8025248532ebf58ff4de2c7274741284af9f4388a58768822c8&screenReslolution=414.00x896.00&supportWebp=1&sysVersion=15.1&type=0",
					data:{
						shopId:this.shopId,
						firstCategory:'葡萄酒',
						secondCategory:'澳大利亚',
						sort:''
					}
				}).then(res=>{
					console.log("产品:",res);
					this.products = res.data.result.products
				})
			}
		},
		onLoad(option){
			console.log(option.shopId)
			this.shopId = option.shopId;
			this.loadShopInfo()
		}
	}
</script>

<style lang="scss">
.shopinfo_content{
	background-color: #F1F1F1;
	.shopInfo_detail{
		margin: 20upx;
		padding-left: 20upx;
		padding-top: 20upx;
		padding-right: 20upx;
		padding-bottom: 10upx;
		display: flex;
		background-color: #FFFFFF;
		.shopInfo_headImage{
			image{
				border-radius: 20upx;
				width: 100upx;
				height: 100upx;
			}
		}
		.shopInfo_name_time{
			margin-left: 20upx;
			.shopInfo_name{}
			.shopInfo_deliveryTime{
				color: #DCDCDC;
				font-size: 20upx;
			}
			.shopInfo_secondTitle{
				color: #DCDCDC;
				font-size: 20upx;
			}
		}
	}
	.shopInfo_category_productList{
		margin: 20upx;
		.shopInfo_category_productList_tabs{
			background-color: #FFFFFF;
			display: flex;
			margin-top: 10upx;
			height: 60upx;
			// vertical-align: middle;
			line-height: 60upx;
			padding-left: 10upx;
			.shopInfo_category_productList_tabs_home{
				margin-right: 40upx;
			}
			.shopInfo_category_productList_tabs_prod{
				margin-right: 40upx;
			}
			.shopInfo_category_productList_tabs_shangjia{}
		}
		.shopInfo_category_productList_scroll{
			margin-top: 10upx;
			display: flex;
			margin-bottom: 0upx;
			height: 1000upx;
			.shopInfo_scroll_left{
				text-align: center;
				width: 20%;
				height: 100%;
				.category{
					.category_item{
						height: 80upx;
						line-height: 80upx;
						font-size: 25upx;
					}
					.category_item_selected{
						background-color: #FFFFFF;
					}
				}
			}
			.shopInfo_scroll_right{
				background-color: #FFFFFF;
				width: 80%;
				height: 100%;
				.product_labels{
					margin-top: 20upx;
					margin-bottom: 20upx;
					font-size: 20upx;
					.product_label{
						margin-left: 20upx;
						color: #6A6A6A;
						background-color: #E8E8E8;
						border-radius: 20upx;
						padding-left: 10upx;
						padding-right: 10upx;
					}
					.product_label_selected{
						margin-left: 20upx;
						color: #E43D33;
						border: 1upx #E43D33 solid;
						border-radius: 20upx;
						padding-left: 10upx;
						padding-right: 10upx;
					}
				}
				.product_sort{
					display: flex;
					justify-content: space-between;
					margin-left: 50upx;
					margin-right: 50upx;
				}
				.product_type{
					margin-left: 50upx;
					margin-top: 50upx;
				}
				.productList{
					.product_item{
						display: flex;
						.product_listImage{
							image{
								width: 160upx;
								height: 160upx;
							}
						}
					}
					
				}
			}
		}
	}
}
</style>

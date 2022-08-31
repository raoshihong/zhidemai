<template>
	<view class="product_deailt">
		<view class="product_deail_nav">
			<uni-nav-bar :fixed="true" color="#333333" 
			:statusBar="true"
			:border="false"
			background-color="#FFFFFF" leftWidth="40upx" rightWidth="100upx">
				<!-- slot为left表示左边 -->
				<view slot="left">
					<view class="iconfont icon-fanhui" @click="goBack"></view>
				</view>
				<!-- slot为default时,为中间 -->
				<view class="nav-bar-middle">
					<view class="nav-bar-middle-tab">
						<view class="nav-bar-middle-tab-item" @click="showProduct">商品</view>
						<view class="nav-bar-middle-tab-item" @click="showComment">评论</view>
						<view class="nav-bar-middle-tab-item" @click="showDetail">详情</view>
					</view>
					<view class="nav-bar-middle-line"></view>
				</view>
				<!-- slot为right表示右边 -->
				<view slot="right" class="nav-bar-right">
					<text class="iconfont icon-fenxiang" @click="share"></text>
					<text class="iconfont icon-qita" @click="qita"></text>
				</view>
			</uni-nav-bar>
		</view>
		<scroll-view scroll-y="true" :scroll-top="scrollTop"
		 class="product_detail_scrollview" >
			<view class="product_detail_content">
				<swiper class="product_detail_swiper" :indicator-dots="indicatorDots" >
					<swiper-item class="product_detail_pannel" v-for="(item,index) in productInfo.imageList" :key="index">
						<image :src="item.smallImage" class="product_detail_img" mode="widthFix"></image>
					</swiper-item>
				</swiper>
				<view class="product_deailt_price_name">
					<view class="product_deailt_price">¥{{productInfo.mobileExclusivePrice}}</view>
					<view class="product_deailt_proName">{{productInfo.proName}}</view>
					<view class="product_deailt_promotionName" v-if="productInfo.promotions != undefined && productInfo.promotions.length>0">{{productInfo.promotions[0].promotionName}}</view>
					<view class="product_deailt_promotionTypeName">
						<text class="product_deailt_promotionTypeName_text" v-if="productInfo.promotionTitle != undefined">{{productInfo.promotionTitle.promotionTypeName}}</text>
					</view>
				</view>
				<view class="product_detail_youhui">
					<view class="product_detail_youhui_first">
						<view class="product_detail_youhui_first_title">优惠</view>
						<view class="product_detail_youhui_second">
							<view class="product_detail_youhui_second_title">
								<text class="product_detail_youhui_second_duomai">多买多赠</text>
								<text class="product_detail_youhui_second_lihe">送两套大红袍礼盒</text>
							</view>
							<view class="product_detail_youhui_second_img">
								<view class="product_detail_youhui_second_img_1">
									<image v-if="productInfo.largesses != undefined && productInfo.largesses.length>0 && productInfo.largesses[0].productImage != undefined" :src="productInfo.largesses[0].productImage"></image>
									<view>
										<text class="product_detail_youhui_zengping">赠品</text>
										<text class="product_detail_youhui_dhp">大红袍</text>
									</view>
								</view>
								<view class="product_detail_youhui_second_img_2">x2</view>
							</view>
						</view>
					</view>
					<view class="product_detail_youhui_line"></view>
					<view class="product_detail_jinbi">
						<text>金币</text>
					</view>
				</view>
				<view class="product_detail_addr_sku">
					<view class="product_detail_sku_select">
						<view>
							<text>已选</text>
							<text class="product_detail_sku_select_num">1件</text>
							<text>53容打酱油国际</text>
						</view>
						<view class="iconfont icon-jinrujiantou-copy"></view>
					</view>
					<view class="product_detail_addr_sku_line"></view>
					<view class="product_detail_addr">
						<view>
						<text>送至</text>
						<text>广东省</text>
						<text>深圳市</text>
						<text>宝安区</text>
						</view>
						<view class="iconfont icon-jinrujiantou-copy"></view>
					</view>
					<view class="product_detail_addr_sku_line"></view>
					<view>
						<text>提示</text>
						<text>此商品不能使用优惠券</text>
					</view>
					<view class="product_deail_tips">
						<view class="product_deail_tips_item" v-for="(descriptionUrl,index) in productInfo.serviceDescriptionUrl" :key="index">
							<image :src="descriptionUrl.adImg"></image>
							<text class="product_deail_tips_item_text">{{descriptionUrl.advertisingName}}</text>
						</view>
					</view>
				</view>
				<view class="product_detail_comments">
					<view class="product_detail_comments_rank">
						<view class="product_detail_comments_total">
							<view>商品评价({{comments.commentCount}}人评论)</view>
							<view>
								<text>好评率</text>
								<text>{{comments.rate}}</text>
								<text class="iconfont icon-jinrujiantou-copy"></text>
							</view>
						</view>
						<view class="product_detail_comments_labels">
							<view :style="{backgroundColor:commentLabel.color}" class="product_detail_comments_label" v-for="(commentLabel,index) in comments.labelList" :key="index">
								{{commentLabel.coment}}
							</view>
						</view>
					</view>
					<view class="product_detail_comments_list">
						<view class="product_detail_comments_item" v-for="(comment,index) in comments.commentList" :key="comment.firstComment.comentId">
							<view class="product_detail_comments_item_head">
								<view class="comments_head_image">
									<image :src="comment.userImg" mode="heightFix"></image>
								</view>
								<view class="comments_user">
									<view class="comments_user_info">
										<text>{{comment.userName}}</text>
										<image :src="comment.userLevelImg"></image>
									</view>
									<view>
										<uni-rate  active-color="red" :readonly="true" :value="comment.firstComment.comentScore" />
									</view>
								</view>
							</view>
							<view class="product_detail_comments_item_conent">
								<text>{{comment.firstComment.coment}}</text>
							</view>
							<view class="product_detail_comment_image_list">
								<view class="product_detail_comment_image" v-for="(commentImg,index) in comment.firstComment.imgList" :key="index">
									<image :src="commentImg.imgUrl" mode="aspectFill"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="product_detail_comments_to">
						<view class="product_detail_comments_to_content">
							<text class="iconfont icon-pinglun-copy"></text>
							<text class="to_comment_detail">查看详细评论</text>
						</view>
					</view>
				</view>
				<view class="product_introduct">
					<view v-html="html"></view>
				</view>		
		</view>
		</scroll-view>
		<view class="product_detail_tabbar">
			<view class="goods-carts">
				<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick"/>
			</view>
		</view>
		
	</view>
</template>

<script>
	// 引入组件
	// import product from './product/product.vue'
	// import detail from './detail/detail.vue'
	// import comment from './comment/comment.vue'
	
	// 引入js
	import comments from './produt-comments.js'
	
	export default {
		// 注册组件
		// components:{
		// 	product,
		// 	detail,
		// 	comment
		// },
		data() {
			return {
				proId:-1,
				indicatorDots:true,
				productInfo:{
					imageList:[]
				},
				// 将自定义的对象赋值给data的属性
				comments:comments,
				iframeH: 100,
				// time:''
				options: [{
					icon: 'chat',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 0,
					infoBackgroundColor:'#007aff',
					infoColor:"#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				],
				scrollTop:0,
				html:'',
				addCarRequestBody:{
					'apiVersion':"1.0",
					'appKey':"948998E9-F6C0-452E-A57C-222AA1875E1C",
					'appVersion':"9.0.13",
					'areaId':"708",
					'channelCode':"0,1",
					'cityName':"深圳市",
					'cpsId':"appstore",
					'deviceIdentify':"B243531B-7EB8-4539-AB1F-D6FC9E8E071D",
					'deviceType':"IPHONE",
					'deviceTypeExtra':"0",
					'equipmentType':"iPhone",
					'lati':"22.69151231553819",
					'longi':"113.8075759548611",
					'netEnv':"WIFI",
					'productIds':-1,
					'productNums':"1",
					'pushToken':"e944d92184659d4cca277f3c1d6e2315a790e1297d1015cc711408b95dc30761",
					'screenReslolution':"414.00x896.00",
					'supportWebp':"1",
					'sysVersion':"15.1"
				},
				addCarResponse:{
					statusCode:-1,
					data:{}
				}
			}
		},
		methods: {
			getDetail:function(){
				this.request({
					url:"https://newappproduct.jiuxian.com//product/proDetail.htm?apiVersion=1.0&appKey=40F5A668-75BA-426B-A061-0E87747884EB&appVersion=9.0.12&areaId=708&channelCode=0%2C1&cityName=%E6%B7%B1%E5%9C%B3%E5%B8%82&cpsId=appstore&deviceIdentify=40F5A668-75BA-426B-A061-0E87747884EB&deviceType=IPHONE&deviceTypeExtra=0&equipmentType=iPhone&lati=22.69146755642361&longi=113.8076155598958&netEnv=WIFI&pushToken=99afd004c81de8025248532ebf58ff4de2c7274741284af9f4388a58768822c8&screenReslolution=414.00x896.00&supportWebp=1&sysVersion=15.1",
					data:{
						proId:this.proId
					}
				}).then(res=>{
					this.productInfo = res.data.result;
					// console.log(this.productInfo)
					this.loadHtml();
				})
			}
			,onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e)
				let index = e.index;
				if(0 == index){
					// 加入购物车
					this.addCarRequestBody.productIds = this.proId
					this.request({
						url:"https://newappcart.jiuxian.com/shoppingcart/add.htm",
						method:"POST",
						header:{
							'content-type':"application/x-www-form-urlencoded"
						},
						data:this.addCarRequestBody
					}).then(res=>{
						console.log("加入购物车",res)
						this.addCarResponse = res
						if(200 == this.addCarResponse.statusCode
						&& 1== this.addCarResponse.data.success){
							uni.showToast({
								title:"已加入购物车哦!"
							})
							this.options[2].info = this.addCarResponse.data.result.skuNum;
							// 将数据存储到本地
							try {
								uni.setStorageSync(this.constants.carKey, this.addCarResponse.data.result.skuNum);
							} catch (e) {
								// error
								console.log("保存失败",e)
							}
						}
						
					})
				}else{
					
				}
			},
			goBack:function(){
				uni.navigateBack({
					delta:1
				})
			},
			share:function(){
				console.log("share");
			},
			qita:function(){
				console.log("qita");
			},
			showProduct:function(){
				console.log("showProduct");
			},
			showComment:function(){
				// this.scrollTop = 200;
				console.log("showComment");
			},
			showDetail:function(){
				console.log("showDetail");
			},
			loadHtml(){
				this.request({
					url:this.productInfo.productIntroductUrl
				}).then(res=>{
					this.html = res.data
				})
			}
		}
		,onLoad(option) {
			this.proId = option.id;
			this.getDetail();
			this.options[2].info = uni.getStorageSync(this.constants.carKey);
		}
	}

</script>

<style lang="scss" scoped>
.product_deailt{
	background-color: #F7F7F7;
	.product_deail_nav{
		.nav-bar-middle{
			width: 100%;
			.nav-bar-middle-tab{
				display: flex;
				line-height: 64upx;
				justify-content: center;
				.nav-bar-middle-tab-item{
					margin: 10upx;
				}
			}
			.nav-bar-middle-line{}
		}
		.nav-bar-right{
			.icon-fenxiang{
				margin-right: 25upx;
			}
		}
	}
	.product_detail_scrollview{
		// #ifdef H5 
		height: calc(100vh - 84upx - 84upx);
		// #endif 
		// #ifndef H5 
		height: calc(100vh - 84upx - 84upx - 84upx);
		// #endif 
		overflow: hidden;
		.product_detail_content{
			// 100vh 屏幕高度  
			.product_detail_swiper{
				background-color: #FFFFFF;
				// 计算整个swiper的高度
				height: calc(750upx - 100upx);
				.product_detail_pannel{
					text-align: center;
					.product_detail_img{
					}
				}
			}
			.product_deailt_price_name{
				background-color: #FFFFFF;
				margin-left: 20upx;
				margin-right: 20upx;
				margin-top: 20upx;
				border-radius: 10upx;
				padding: 10upx;
				.product_deailt_price{
					color: #E43D33;
					font-weight: 600;
					font-size: 40upx;
				}
				.product_deailt_promotionName{
					color: #C0C0C0;
				}
				.product_deailt_promotionTypeName_text{
					color: #FFFFFF;
					background-color: #E43D33;
					border-radius: 20upx;
					font-size: 16upx;
					padding: 5upx;
				}
			}
			.product_detail_youhui{
				background-color: #FFFFFF;
				margin-left: 20upx;
				margin-right: 20upx;
				margin-top: 20upx;
				.product_detail_youhui_first{
					display: flex;
					padding-left: 20upx;
					.product_detail_youhui_first_title{
						margin-top: 20upx;
					}
					.product_detail_youhui_second{
						margin-top: 20upx;
						margin-left: 20upx;
						.product_detail_youhui_second_title{
							.product_detail_youhui_second_duomai{
								color: #FF5A5F;
								border: 1upx #FF5A5F solid;
								border-radius: 20upx;
								font-size: 20upx;
								padding: 2upx;
							}
							.product_detail_youhui_second_lihe{
								font-size: 30upx;
								margin-left: 20upx;
							}
						}
						.product_detail_youhui_second_img{
							margin-top: 30upx;
							display: flex;
							width: calc(750upx - 160upx);
							justify-content: space-between;
							align-items:center;
							.product_detail_youhui_second_img_1{
								display: flex;
								align-items:center;
								image{
									width: 100upx;
									height: 100upx;
								}
								.product_detail_youhui_zengping{
									font-size: 16upx;
									color: #FF5A5F;
									margin-left: 20upx;
								}
								.product_detail_youhui_dhp{
									font-size: 20upx;
									margin-left: 10upx;
								}
							}
						}
					}
				}
				.product_detail_youhui_line{
					height: 1upx;
					background-color: #F1F1F1;
					margin-left: 20upx;
					margin-right: 20upx;
				}
				.product_detail_jinbi{
					margin: 20upx;
				}
			}
			.product_detail_addr_sku{
				background-color: #FFFFFF;
				margin-left: 20upx;
				margin-right: 20upx;
				margin-top: 20upx;
				padding-left: 20upx;
				padding-right: 20upx;
				.product_detail_sku_select{
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 60upx;
					.product_detail_sku_select_num{
						color: #8F939C;
						border: 1upx #8F939C solid;
						padding: 5upx;
						border-radius: 15upx;
						font-size: 20upx;
					}
				}
				.product_detail_addr_sku_line{
					background-color: #F1F1F1;
					height: 2upx;
				}
				.product_detail_addr{
					align-items: center;
					height: 60upx;
					display: flex;
					justify-content: space-between;
				}
				.product_deail_tips{
					background-color: #F1F1F1;
					margin: 20upx;
					padding: 20upx;
					display: flex;
					flex-wrap: wrap;
					margin-top: 20upx;
					.product_deail_tips_item{
						display: flex;
						align-items: center;
						font-size: 20upx;
						image{
							width: 30upx;
							height: 30upx;
						}
						.product_deail_tips_item_text{
							margin-left: 10upx;
							margin-right: 50upx;
						}
					}
				}
				
			}
			.product_detail_comments{
				background-color: #FFFFFF;
				margin: 20upx;
				border-radius: 10upx;
				padding: 20upx;
				.product_detail_comments_rank{
					.product_detail_comments_total{
						display: flex;
						justify-content: space-between;
					}
					.product_detail_comments_labels{
						display: flex;
						flex-wrap: wrap;
						.product_detail_comments_label{
							margin-right: 20upx;
							margin-top: 10upx;
							padding: 10upx;
							font-size: 20upx;
							border-radius: 25upx;
						}
					}
				}
				.product_detail_comments_list{
					margin-top: 20upx;
					.product_detail_comments_item{
						.product_detail_comments_item_head{
							display: flex;
							.comments_head_image{
								image{
									width: 100upx;
									height: 100upx;
									border-radius: 50upx;
								}
							}
							.comments_user{
								margin-left: 15upx;
								.comments_user_info{
									padding-left: 10upx;
									image{
										margin-left: 10upx;
										width: 63upx;
										height: 37upx;
									}
								}
							}
							
						}
						.product_detail_comments_item_conent{
							font-size: 20upx;
						}
						.product_detail_comment_image_list{
							display: flex;
							flex-wrap: wrap;
							.product_detail_comment_image{
								margin-right: 10upx;
								margin-top: 10upx;
								image{
									width: calc(750upx / 4);
									height: calc(750upx / 4);
								}
							}
						}
					}
				}
				.product_detail_comments_to{
					margin-top: 10upx;
					margin-bottom: 10upx;
					display: flex;
					justify-content: center;
					.product_detail_comments_to_content{
						text-align: center;
						font-size: 25upx;
						width: 210upx;
						border: 1upx #FF5A5F solid;
						color: #FF5A5F;
						border-radius: 10upx;
						padding: 10upx;
						.to_comment_detail{
							margin-left: 10upx;
						}
					}
					
					
				}
			}
			.product_introduct{
				
			}
		}
	}
	.product_detail_tabbar{
		width: 100%;
	}
}
</style>

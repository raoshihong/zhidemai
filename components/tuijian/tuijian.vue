<template>
	<view class="tuijian">
		<!-- 搜索模块 -->
		<view class="tuijian_search">
			<view class="tuijian_search_title">
				<view class="iconfont icon-sousuo-copy"></view>
				<text class="tuijian_text">信用卡</text>
			</view>
			<view class="iconfont icon-saoyisao-copy"></view>
		</view>
		<scroll-view class="tuijian_scroll_view"  scroll-y="true" @scrolltolower="lower">
			<view class="tuijian_swiper">
				<!-- <uni-swiper-dot :info="swiper_info_list" :current="swiper_current" field="content" :mode="swiper_mode"> -->
					<swiper class="swiper-box" @change="swiper_change" autoplay="true" indicator-dots="true" circular="true">
						<swiper-item v-for="(item ,index) in swiper_info_list" :key="index">
							<image :src="item.adImg"></image>
						</swiper-item>
					</swiper>
				<!-- </uni-swiper-dot> -->
			</view>
			<!-- menu模块 -->
			<view class="tuijian_menu">
				<swiper class="tuijian_menu_swiper-box" @change="swiper_change" :indicator-dots="indicatorDots" >
					<swiper-item class="tuijian_menu_pannel" v-for="(items,index) in adv_items" :key="index">
						<view class="tuijian_menu_item" v-for="(item,idx) in items" :key="idx">
							<image :src="item.adImg" class="tuijian_menu_img" mode="widthFix"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- menu模块 -->
			<!-- <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
				<view class="scroll-view-item_H" v-for="(items,index) in adv_items" :key="index">
					<view class="item_H">
						<view class="tuijian_menu_item" v-for="(item,idx) in items" :key="idx">
							<image :src="item.adImg" class="tuijian_menu_img" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</scroll-view> -->
			<!-- 通告 -->
			<swiper class="tuijian_tonggao">
				<swiper-item class="tuijian_tonggao_item" v-for="(item,index) in tonggao_items" :key="index">
					<image :src="item.adImg" mode="widthFix"></image>
				</swiper-item>
			</swiper>
			
			<!-- 头条 -->
			<view class="tuijian_toutiao">
				<view class="tuijian_toutiao_header">
					<image :src="toutiao_header_imag" ></image>
				</view>
				<view class="tuijian_toutiao_h_line">|</view>
				<swiper class="tuijian_toutiao_swiper" vertical  autoplay="true" circular="true">
					<swiper-item class="tuijian_toutiao_swiper_item" v-for="(item,index) in toutiao_items" :key="index">
						<view class="tuijian_toutiao_swiper_item_titile">{{item.adTitle}}</view>
					</swiper-item>
				</swiper>
			</view>
			
			<!-- 店铺 -->
			<view class="tuijian_shop" v-if="shopInfo!=undefined && shopInfo.name!=undefined && shopInfo.name.length>0">
				<view class="tuijian_shop_info_wrap">
					<view class="tuijian_shop_info">
						<view class="tuijian_shop_info_headImage">
							<image :src="shopInfo.headImage" mode="widthFix"></image>
						</view>
						<view class="tuijian_shop_info_addr">
							<view class="tuijian_shop_name">{{shopInfo.name}}</view>
							<view class="tuijian_shop_time">
								<view v-if="shopInfo.deliveryTimeOverTitle != undefined">
									<text class="tuijian_shop_yuding">{{shopInfo.reserveTitle}}</text>
									<text class="tuijian_shop_peisong">{{shopInfo.deliveryTimeOverTitle}}</text>
								</view>
								<view class="tuijian_shop_secondary">{{shopInfo.secondaryTitle}}</view>
								<view class="tuijian_shop_actName" v-if="shopInfo.promoTags != undefined" >
									<text class="tuijian_shop_actName_text" :style="{color:shopInfo.promoTags[0].actColor}">{{shopInfo.promoTags[0].actName}}</text>
								</view>
							</view>
						</view>
					</view>
					<view class="tuijian_shop_more_wrap">
						<view class="tuijian_shop_more">更多 <text class="iconfont icon-jinrujiantou-copy"></text></view>
						<view class="tuijian_shop_distance">
							{{shopInfo.distanceDescribe}}
						</view>
					</view>
				</view>
				<view class="tuijian_shop_products">
					<scroll-view class="tuijian_shop_products_scroll_view" scroll-x="true" @scroll="scroll">
						<view class="tuijian_shop_products_scroll_view_item" v-for="(goods,index) in shopInfo.goodsList" :key="goods.goodsId">
							<navigator :url="`../../pages/index/shopinfo/shopinfo?shopId=${shopInfo.shopId}`">
								<view class="tuijian_shop_goods_img">
									<image :src="goods.image" mode="heightFix"></image>
								</view>
								<view class="tuijian_shop_goods_name">{{goods.name}}</view>
								<view class="tuijian_shop_goods_price">¥{{goods.price}}</view>
							</navigator>
						</view>
					</scroll-view> 
				</view>
			</view>
			
			<!-- 掌上秒拍 -->
			<view class="tuijian_miaopai">
				<view class="tuijian_miaopai_title">
					<image :src="miaopai_item.adImg" mode="widthFix"></image>
				</view>
				<view class="tuijian_miaopai_content" v-if="seckillInfoForIndex != undefined">
					<view class="tuijian_miaopai_time_more">
						<view class="tuijian_miaopai_time">
							<text class="tuijian_miaopai_time_juli">距结束</text>
							<uni-countdown :show-day="false" :hour="parseInt(seckillInfoForIndex.hour)"
							 :minute="parseInt(seckillInfoForIndex.minute)" :second="parseInt(seckillInfoForIndex.second)"
							  backgroundColor="#E43D33" color="#FFFFFF" splitorColor="#E43D33" />
						</view>
						<view class="tuijian_miaopai_more">
							<text>更多产品等你来</text>
							<text class="iconfont icon-jinrujiantou-copy"></text>
						</view>
					</view>
					<view class="tuijian_miaopai_products" v-if="seckillInfoForIndex.proList != undefined && seckillInfoForIndex.proList.length>0">
						<scroll-view class="tuijian_miaopai_products_scroll-view" scroll-x="true" @scroll="scroll" scroll-left="120" :show-scrollbar="false">
							<view class="tuijian_miaopai_products_scroll-view_item" v-for="prod in seckillInfoForIndex.proList" :key="prod.proId">
								<image :src="prod.proImg" mode="widthFix"></image>
								<view class="tuijian_miaopai_product_name">{{prod.proName}}</view>
								<view class="tuijian_miaopai_product_proPrice">¥{{prod.proPrice}}</view>
								<view class="tuijian_miaopai_product_jxPrice">¥{{prod.jxPrice}}</view>
							</view>
						</scroll-view>
					</view>
				</view>
			</view>
			
			<!-- 爆款推荐 -->
			<view class="tuijian_recomment">
				<view class="tuijian_recomment_title">
					<image :src="recommen.adImg" mode="widthFix"></image>
				</view>
				<view class="tuijian_recomment_product">
					<view class="tuijian_recomment_product_item" v-for="product in recommen_products" :key="product.proId">
						<navigator :url="`../../pages/index/product-detail/product-detail?id=${product.proId}`">
							<view class="tuijian_recomment_product_promotion">
								<text class="product_promotion" v-for="(promotion,index) in product.promotionList" :key="index" 
								:style="{color:promotion.wordColor,backgroundColor:promotion.backColor }">
									{{promotion.name}}
								</text>
							</view>
							<view class="tuijian_recomment_product_icon"><image :src="product.proImg"></image></view>
							<view class="tuijian_recomment_product_name">
								<text>{{product.proName}}</text>
							</view>
							<view class="tuijian_recomment_product_price">
								<text>¥{{product.proPrice}}</text>
							</view>
						</navigator>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"tuijian",
		data() {
			return {
				"adv_items":[
				],
				"product_list":[],
				"swiper_info_list": [],
				"swiper_current": 0,
				"swiper_mode": 'dot',
				indicatorDots:true,
				"tonggao_items":[],
				toutiao_header_imag:"",
				toutiao_items:[],
				shopInfo:{
					name:"",
					headImage:"",
					reserveTitle:"",
					secondaryTitle:"",
					deliveryTimeOverTitle:"",
					distanceDescribe:"",
					goodsList:[]
				},
				miaopai_item:{
					adImg:""
				},
				seckillInfoForIndex:{
					
				},
				recommen:{},
				pageCount:1,
				recommen_products:[],
				params:{
					pageIndex:1,
					pageSize:10
				}
			};
		},
		methods:{
			swiper_change(e) {
			    this.swiper_current = e.detail.current;
			},
			scroll: function(e) {
			},
			lower:function(e){
				this.params.pageIndex++ 
				this.getRecommentProducts();
			},
			getRecommentProducts:function(){
				// 推荐产品
				if(this.params.pageIndex > this.pageCount){
					uni.showToast({
						title:"我也是有底线的",
						icon:"none"
					})
					return;
				}
				this.request({
					url:"https://newapphome.jiuxian.com/home/recommend.htm?apiVersion=1.0&appKey=40F5A668-75BA-426B-A061-0E87747884EB&appVersion=9.0.12&areaId=708&channelCode=0%2C1&cityName=%E6%B7%B1%E5%9C%B3%E5%B8%82&cpsId=appstore&deviceIdentify=40F5A668-75BA-426B-A061-0E87747884EB&deviceType=IPHONE&deviceTypeExtra=0&equipmentType=iPhone&lati=22.69146755642361&longi=113.8076155598958&netEnv=WIFI&pushToken=99afd004c81de8025248532ebf58ff4de2c7274741284af9f4388a58768822c8&screenReslolution=414.00x896.00&supportWebp=1&sysVersion=15.1",
					data:this.params
				}).then(res=>{
					console.log("tuijianchanpin:",res);
					this.pageCount = res.data.result.pageCount
					
					if(this.params.pageIndex <= this.pageCount && this.utils.isNotEmpty(res.data.result.list)){
						// 数组拼接
						this.recommen_products = [...this.recommen_products,...res.data.result.list];
					}else{
						uni.showToast({
							title:"我也是有底线的",
							icon:"none"
						})
						return;
					}
				})
			}
		},
		// vue声明周期的onLoad方法
		mounted() {
			// this表示的就是vue的对象,因为request挂在在Vue的proptotype上,所以所有的vue对象共享
			this.request({
				url:"https://newapphome.jiuxian.com/home/getHomePageInfoAmend.htm?apiVersion=1.0&appKey=40F5A668-75BA-426B-A061-0E87747884EB&appVersion=9.0.12&areaId=708&channelCode=0%2C1&cityName=%E6%B7%B1%E5%9C%B3%E5%B8%82&cpsId=appstore&deviceIdentify=40F5A668-75BA-426B-A061-0E87747884EB&deviceType=IPHONE&deviceTypeExtra=0&equipmentType=iPhone&lati=22.69146755642361&longi=113.8076155598958&netEnv=WIFI&pushToken=99afd004c81de8025248532ebf58ff4de2c7274741284af9f4388a58768822c8&screenReslolution=414.00x896.00&supportWebp=1&sysVersion=15.1"
			}).then(res=>{
				console.log("首页",res)
				// 设置轮播
				this.swiper_info_list = res.data.result.infoList.find(item=>item.homeIndex == 1).itemList
				
				// 按钮
				let advitemList = res.data.result.infoList.find(item=>item.homeIndex == 2).itemList;
				// 一维转二维
				let length = advitemList.length;
				let count = length % 10 == 0 ? length / 10 : Math.floor(length/10+1);
				for(let i=0;i < count;i++){
					this.adv_items.push(advitemList.slice(i*10,i*10+10));
				}
				
				// 通告
				this.tonggao_items = res.data.result.infoList.find(item=>item.homeIndex == 3).itemList;
				
				// 头条
				this.toutiao_items = res.data.result.infoList.find(item=>item.homeIndex == 7).itemList;
				this.toutiao_header_imag = this.toutiao_items[0].adImg
				
				// 店铺
				let shop = res.data.result.infoList.find(item=>item.indexName == '附近门店');
				
				this.shopInfo = (shop != undefined?shop.shopInfo:{});
			
				// 掌上秒拍
				let miaopai_items = res.data.result.infoList.find(item=>item.homeIndex == 9).itemList;
				this.miaopai_item =  this.utils.isNotEmpty(miaopai_items)?miaopai_items[0]:{};
				
				
				// 爆款推荐
				let recommens = res.data.result.infoList.find(item=>item.homeIndex == 18).itemList;
				this.recommen = this.utils.isNotEmpty(recommens)?recommens[0]:{};
				console.log("recommen",this.recommen)
				
			});
			
			// 掌上秒拍商品列表
			this.request({
				url:"https://newapphome.jiuxian.com/home/getMiaoPaiProForIndex.htm?apiVersion=1.0&appKey=40F5A668-75BA-426B-A061-0E87747884EB&appVersion=9.0.12&areaId=708&channelCode=0%2C1&cityName=%E6%B7%B1%E5%9C%B3%E5%B8%82&cpsId=appstore&deviceIdentify=40F5A668-75BA-426B-A061-0E87747884EB&deviceType=IPHONE&deviceTypeExtra=0&equipmentType=iPhone&lati=22.69146755642361&longi=113.8076155598958&netEnv=WIFI&pushToken=99afd004c81de8025248532ebf58ff4de2c7274741284af9f4388a58768822c8&screenReslolution=414.00x896.00&supportWebp=1&sysVersion=15.1"
			}).then(res=>{
				console.log("miaopai:",res);
				this.seckillInfoForIndex = res.data.result.seckillInfoForIndex
			});
			
			this.getRecommentProducts();
		}
	}
</script>

<style lang="scss">
	
.tuijian{
	background-color: #F7F7F7;
	
	.tuijian_search{
		// 设置为flex弹性盒子,不设置flex则默认是垂直排列,设置为flex布局,则默认是水平
		display: flex;
		// 设置元素左右两边靠
		justify-content: space-between;
		height: 80upx;
		background-color: #F5F5F5;
		border-radius: 10upx;
		margin: 15upx;
		.tuijian_search_title{
			display: flex;
			.icon-sousuo-copy{
				// 垂直居中
				margin: auto 15upx;
			}
			.tuijian_text{
				margin: auto 0;
				color: #C7C7C7;
				font-size: 15upx;
			}
		}
		.icon-saoyisao-copy{
			margin: auto 15upx;
		}
	}
	.tuijian_scroll_view{
		// 设置scroll-view的高度
		height: calc(100vh - 80upx - 60upx);
		.tuijian_swiper{
			.swiper-box{
				// 1250 810
				// 计算swiper的高度
				// uniapp的基准宽度为750 ,所以计算高度 height/750 = 图片height/图片width
				// 
				
				height: calc(750upx * (678/1080));
				image{
					// 设置图片自适应父元素宽高
					width: 100%;
					height: 100%;
				}
			}
		}
		
		.tuijian_menu{
			// 设置scroll-view的宽度为屏幕宽
			width: 100%;
			// 图片 宽216*5 放5个 高230*2 放2列
			// 750  
			height: calc(750upx * ((230 * 2)/(216 * 5)));
			.tuijian_menu_swiper-box{
				height: 100%;
				.tuijian_menu_pannel{
					width: 100%;
					height: 100%;
					// 设置子元素布局为flex，横行伸缩
					display: flex;
					// 自动换行
					flex-wrap: wrap;
					.tuijian_menu_item {
						width: 20%;
						// 设置内容居中
						// text-align: center;
						.tuijian_menu_img{
							width: 100%;
						}
					}
				}
			}
		}
		/**
		.scroll-view_H {
			// 允许不换号
			white-space: nowrap;
			width: 100%;
			.scroll-view-item_H {
				// 设置块级元素在同一行显示
				display: inline-block;
				width: 100%;
				height: 300rpx;
				.item_H{
					// 设置子元素布局为flex
					display: flex;
					// 自动换行
					flex-wrap: wrap;
					.tuijian_menu_item {
						width: 20%;
						// 设置内容居中
						// text-align: center;
						.tuijian_menu_img{
							width: 100%;
						}
					}
				}
			}	
		}
		**/
		
		.tuijian_tonggao{
			width: 100%;
			// 图片真实 宽1080 高251
			// 750宽 
			// 750upx*(251/1080)
			height: calc(750upx * 0.2324);
			margin-top: 20upx;
			.tuijian_tonggao_item{
				image{
					width: 100%;
				}
			}
		}
		
		.tuijian_toutiao{
			background-color: #FFFFFF;
			height: 80upx;
			display: flex;
			border-radius: 40upx;
			margin:10upx 10upx;
			.tuijian_toutiao_header{
				width: 227upx;
				height: 80upx;
				margin-left: 25upx;
				image{
					width: 218upx;
					height: 41upx;
					// 平移50%
					transform: translateY(50%);
				}
			}
			.tuijian_toutiao_h_line{
				color: #E43D33;
				margin: auto 20upx;
				line-height: 80upx;
			}
			.tuijian_toutiao_swiper{
				width: 80%;
				margin: auto 0upx;
				height: 100%;
				.tuijian_toutiao_swiper_item{
					height: 100%;
					.tuijian_toutiao_swiper_item_titile{
						font-size: 20upx;
						line-height: 80upx;
					}
				}
				
			}
		}
		
		.tuijian_shop{
			background-color: #FFFFFF;
			margin: 10upx 10upx;
			.tuijian_shop_info_wrap{
				display: flex;
				justify-content: space-between;
				// padding: 10upx 10upx;
				.tuijian_shop_info{
					display: flex;
					margin: 10upx 10upx;
					.tuijian_shop_info_headImage{
						image{
							width: 80upx;
							height:80upx;
						}
					}
					.tuijian_shop_info_addr{
						margin-left: 10upx;
						.tuijian_shop_name{
							font-weight: bold;
						}
						.tuijian_shop_time{
							
							.tuijian_shop_yuding{
								font-size: 10upx;
								padding: 8upx;
								border-radius: 8upx;
								background-color: #E43D33;
								color: #FFFFFF;
							}
							.tuijian_shop_peisong{
								margin-left: 10upx;
								color: #C0C0C0;
								font-size: 16upx;
							}
							.tuijian_shop_secondary{
								margin-top: 10upx;
								color: #C7C7C7;
								font-size: 12upx;
							}
							.tuijian_shop_actName_text{
								font-size: 12upx;
								border: 1upx #E43D33 solid;
								padding: 5upx 8upx;
								border-radius: 50upx;
							}
						}
					}
				}
				.tuijian_shop_more_wrap{
					.tuijian_shop_more{
						font-size: 14upx;
						color: #C0C4CC;
					}
					.tuijian_shop_distance{
						font-size: 12upx;
						color: #E43D33;
					}
				}
			}
			.tuijian_shop_products{
				margin-top: 20upx;
				.tuijian_shop_products_scroll_view{
					// 允许不换号
					white-space: nowrap;
					width: 100%;
					.tuijian_shop_products_scroll_view_item{
						// 设置块级元素在同一行显示
						display: inline-block;
						// 真实大小为160*160 而一个屏幕放3个,所以是3*160
						// 750  
						width: calc(750upx * (160 / (3 * 160)));
						// margin: 10upx 10upx;
						.tuijian_shop_goods_img{
							height: calc(750upx * (160 / (3 * 160)));
							image{
								width: 100%;
								height: 100%;
							}
						}
						.tuijian_shop_goods_name{
							// 超出则截取
							overflow: hidden;
							// 超出的部分使用...
							text-overflow:ellipsis;
							// 不换行
							white-space: nowrap;
							font-size: 16upx;
							margin: 0upx 10upx;
						}
						.tuijian_shop_goods_price{
							font-size: 16upx;
							color: #E43D33;
							font-weight: bold;
							margin: 0upx 10upx;
						}
					}
				}
			}
		}
		
		.tuijian_miaopai{
			.tuijian_miaopai_title{
				image{
					height:74upx;
					width: 100%;
				}
			}
			.tuijian_miaopai_content{
				background-color: #FFFFFF;
				margin-left: 10upx;
				margin-right: 10upx;
				border-radius: 10upx;
				.tuijian_miaopai_time_more{
					background-color: #FFFFFF;
					display: flex;
					justify-content: space-between;
					height: 70upx;
					line-height: 70upx;
					margin: 10upx 10upx;
					border-radius: 10upx;
					.tuijian_miaopai_time{
						margin-left: 50upx;
						color: #E43D33;
						font-size: 16upx;
						display: flex;
						.tuijian_miaopai_time_juli{
							margin-right: 10upx;
						}
					}
					.tuijian_miaopai_more{
						color: #C7C7C7;
						font-size: 20upx;
					}
				}
				.tuijian_miaopai_products{
					.tuijian_miaopai_products_scroll-view{
						// 允许不换行,设置子元素
						white-space: nowrap;
						display: flex;
						flex-direction: columns;
						width: 100%;
						.tuijian_miaopai_products_scroll-view_item{
							// 设置块级元素在同一行显示
							display: inline-block;
							width: 25%;
							margin: 10upx 10upx;
							image{
								width: 100%;
								// 按比例缩放元素
								// 750  440*3/
								// height: calc(750upx * (440+300)/(440 * 4));
							}
							.tuijian_miaopai_product_name{
								// 恢复子元素支持换行
								white-space: normal;
								letter-spacing: 0;
								overflow: hidden;
								display: -webkit-box;
								text-overflow: ellipsis;
								-webkit-line-clamp: 2;  /*要显示的行数*/
								-webkit-box-orient: vertical;
								font-size:14px;     
							}
							.tuijian_miaopai_product_proPrice{
								color: #E43D33;
								font-weight: 900;
								font-size: 30upx;
							}
							.tuijian_miaopai_product_jxPrice{
								color: #C7C7C7;
								font-size: 14upx;
								text-decoration: line-through;
							}
						}
					}
				}
			}
		}
		
		.tuijian_recomment{
			.tuijian_recomment_title{
				image{
					width: 100%;
					height:74upx;
				}
			}
			.tuijian_recomment_product{
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				
				.tuijian_recomment_product_item{
					margin: 10upx 10upx;
					background-color: #FFFFFF;
					border-radius: 10upx;
					// 750*0.5-20
					width: calc(750upx * 0.5 - 20upx);
					.tuijian_recomment_product_promotion{
						margin-bottom: 10upx;
						margin-top: 10upx;
						.product_promotion{
							font-size: 20upx;
							margin-left: 10upx;
							padding: 5upx;
							border-radius: 5upx;
						}
					}
					.tuijian_recomment_product_icon{
						width: 100%;
						// 设置子元素内容水平居中
						text-align: center;
						image{
							// 440*440
							// 750
							width: calc(750upx * (440/(440*2.5)));
							height: calc(750upx * (440/(440*2.5)));
						}
					}
					.tuijian_recomment_product_name{
						margin-left: 25upx;
						font-size: 30upx;
						white-space: normal;
						letter-spacing: 0;
						overflow: hidden;
						display: -webkit-box;
						text-overflow: ellipsis;
						-webkit-line-clamp: 2;  /*要显示的行数*/
						-webkit-box-orient: vertical;
						font-size:12px;                       
		
					}
					.tuijian_recomment_product_price{
						margin-left: 25upx;
						color: #E43D33;
						font-size: 35upx;
						font-weight: 600;
					}
				}
			}
		}
		
	}
}

</style>

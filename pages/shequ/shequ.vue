<template>
	<view class="shequ_content">
		<view class="shequ_content_nav">
			<uni-nav-bar class="shequ_nav" :fixed="true" :statusBar="true" :border="false">
				<view class="shequ_nav_head" slot="left">
					<image src="../../static/default_head.png"></image>
				</view>
				<view class="shequ_middle">
					<text class="iconfont icon-sousuo-copy"></text>
					<text>搜索社区酒友或内容</text>
				</view>
				<view slot="right">
					<view class="iconfont icon-xiaoxizhongxin"></view>
				</view>
			</uni-nav-bar>
		</view>
		<!-- <scroll-view scroll-y="true" > -->
		<view class="shequ_recommend">
			<view class="shequ_recommend_title">- 达人推荐 -</view>
			<scroll-view class="shequ_recommend_item_list" :scroll-x="true" :show-scrollbar="false">
				<view class="shequ_recommend_item" v-for="(recommend,index) in dataList" :key="index">
					<image :src="recommend.imgPath"></image>
					<view class="shequ_recommend_nick_name">{{recommend.nickName}}</view>
					<view class="shequ_recommend_guanzhu_btn">
						<text class="guanzhu_btn">+ 关注</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="shequ_tab">
			<view>精选页</view>
			<view>活动</view>
			<view>最新</view>
			<view>酒友圈</view>
		</view>
		<view class="shequ_aritcle_list">
			<view class="shequ_aritcle_item" v-for="(article,index) in articleResponse.dataList" :key="article.tid">
				<navigator :url="`./detail/detail?tid=${article.tid}`">
				<view class="aritcle_header">
					<image :src="article.memberBo.headPortrait" mode="widthFix"></image>
					<view class="article_member">
						<view class="article_member_info">
							<view>{{article.memberBo.nickname}}</view>
							<view>
								<text class="guanzhu_btn">+关注</text>
							</view>
						</view>
						<view class="article_datelineText">{{article.datelineText}}</view>
					</view>
				</view>
				<view class="article_content">
					<view class="article_content_subject">
						{{article.subject}}
					</view>
					<view class="article_content_message">
						{{article.message}}
					</view>
				</view>
				<view>
					<view class="article_content_images" v-if="article.images.length<3 && article.images.lenght > 0">
						<image class="article_content_image" mode="aspectFill" :src="article.images[0].smallImageUrl"></image>
					</view>
					<view class="article_content_images" v-if="article.images.length>=3">
						<view>
							<image class="article_content_image_one" mode="aspectFill" :src="article.images[0].smallImageUrl"></image>
						</view>
						<view>
							<view><image class="article_content_image_two" mode="aspectFill" :src="article.images[1].smallImageUrl"></image></view>
							<view><image class="article_content_image_three" mode="aspectFill" :src="article.images[2].smallImageUrl"></image></view>
						</view>
						<!-- <image class="article_content_image" mode="aspectFill" v-for="(image,index) in article.images" :key="index" :src="image.smallImageUrl"></image> -->
					</view>
				</view>
				</navigator>
				<view class="article_toolbar">
					<view class="article_toolbar_zan">
						<text class="iconfont icon-dianzan"></text>
						<text>{{article.praise}}</text>
					</view>
					<view class="article_toolbar_reply">
						<text class="iconfont icon-xiaoxizhongxin"></text>
						<text>{{article.replies}}</text>
					</view>
				</view>
			</view>
		</view>
	<!-- </scroll-view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[],
				articleRequest:{
					pageIndex:1,
					pageSize:10
				},
				articleResponse:{
					dataList: [],
					pageIndex: 1,
					pageSize: 0,
					totalPage: 0,
					totalRecord:0
				}
			}
		},
		methods: {
			getRecommendedInformationFlow(){
				this.request({
					url:"https://newcommunity.jiuxian.com/community/getRecommendedInformationFlow.htm?apiVersion=1.0&appKey=40F5A668-75BA-426B-A061-0E87747884EB&appVersion=9.0.12&areaId=708&channelCode=0%2C1&cityName=%E6%B7%B1%E5%9C%B3%E5%B8%82&cpsId=appstore&deviceIdentify=40F5A668-75BA-426B-A061-0E87747884EB&deviceType=IPHONE&deviceTypeExtra=0&equipmentType=iPhone&lati=22.69145968967014&longi=113.8075116644965&netEnv=WIFI&pushToken=99afd004c81de8025248532ebf58ff4de2c7274741284af9f4388a58768822c8&screenReslolution=414.00x896.00&supportWebp=1&sysVersion=15.1",
					data:this.articleRequest
				}).then(res=>{
					console.log("文字列表",res)
					this.articleResponse = res.data.result
				})
			}
		},
		onLoad() {
			this.request({
				url:"https://newcommunity.jiuxian.com/community/getTalentList.htm?apiVersion=1.0&appKey=40F5A668-75BA-426B-A061-0E87747884EB&appVersion=9.0.12&areaId=708&channelCode=0%2C1&cityName=%E6%B7%B1%E5%9C%B3%E5%B8%82&cpsId=appstore&deviceIdentify=40F5A668-75BA-426B-A061-0E87747884EB&deviceType=IPHONE&deviceTypeExtra=0&equipmentType=iPhone&lati=22.69145968967014&longi=113.8075116644965&netEnv=WIFI&pushToken=99afd004c81de8025248532ebf58ff4de2c7274741284af9f4388a58768822c8&screenReslolution=414.00x896.00&supportWebp=1&sysVersion=15.1"
			}).then(res=>{
				console.log("推荐",res.data.result)
				this.dataList = res.data.result.dataList;
				
			});
			this.getRecommendedInformationFlow();
		}
	}
</script>

<style lang="scss" scoped>
.shequ_content{
	background-color: #F7F7F7;
	.shequ_content_nav{
		.shequ_nav{
			.shequ_nav_head{
				image{
					width: 50upx;
					height: 50upx;
				}
			}
			.shequ_middle{
				line-height: 84upx;
			}
		}
	}
	.shequ_recommend{
		background-color: #FFFFFF;
		.shequ_recommend_title{
			text-align: center;
		}
		.shequ_recommend_item_list{
			margin-top: 10upx;
			white-space: nowrap;
			.shequ_recommend_item{
				text-align: center;
				display: inline-block;
				width: 150upx;
				image{
					width: 100upx;
					height: 100upx;
					border-radius: 50upx;
				}
				.shequ_recommend_nick_name{
					font-size: 25upx;
				}
				.shequ_recommend_guanzhu_btn{
					.guanzhu_btn{
						border: 1upx solid #C8C7CC;
						font-size: 20upx;
						width: 100upx;
						padding-left: 10upx;
						padding-right: 10upx;
					}
				}
			}
		}
	}
	.shequ_tab{
		height: 80upx;
		align-items:center;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-around;
		margin-top: 20upx;
		
		position: -webkit-sticky;
		position: sticky;
		z-index: 1;
		// #ifdef H5 
		top: calc(75upx);//适配网页
		// #endif 
		// #ifndef H5 
		top: calc(74upx * 2);//适配其他平台
		// #endif 
	}
	.shequ_aritcle_list{
		margin-top: 20upx;
		margin-left: 10upx;
		margin-right: 10upx;
		.shequ_aritcle_item{
			background-color: #FFFFFF;
			margin-top: 10upx;
			.aritcle_header{
				display: flex;
				padding-top: 20upx;
				padding-left: 20upx;
				image{
					width: 100upx;
					height: 100upx;
					border-radius: 50upx;
				}
				.article_member{
					margin-left: 20upx;
					margin-right: 20upx;
					.article_member_info{
						display: flex;
						justify-content: space-between;
						width: calc(750upx - 100upx - 30upx - 30upx);
						.guanzhu_btn{
							border: 1upx solid #C8C7CC;
							font-size: 20upx;
							width: 100upx;
							padding-left: 10upx;
							padding-right: 10upx;
						}
					}
					.article_datelineText{
						font-size: 25upx;
						color: #DCDCDC;
					}
				}
			}
			.article_content{
				margin: 20upx;
				.article_content_subject{
					
				}
				.article_content_message{
					padding-top: 10upx;
					// 恢复子元素支持换行
					white-space: normal;
					letter-spacing: 0;
					overflow: hidden;
					display: -webkit-box;
					text-overflow: ellipsis;
					-webkit-line-clamp: 2;  /*要显示的行数*/
					-webkit-box-orient: vertical;
					font-size:12px;                       

				}
			}
			.article_content_images{
				display: flex;
				.article_content_image{
					width: 100%;
					height: calc((750upx * 2 / 3));
				}
				.article_content_image_one{
					width: calc(750upx * 2 / 3 - 20upx);
					height: calc((750upx * 2 / 3 - 20upx)*2 / 3);
				}
				.article_content_image_two{
					margin-left: 10upx;
					width: calc(750upx * 1 / 3 - 20upx);
					height: calc((750upx * 2 / 3 - 20upx)*1 / 3 - 6upx);
				}
				.article_content_image_three{
					margin-left: 10upx;
					width: calc(750upx * 1 / 3 - 20upx);
					height: calc((750upx * 2 / 3 - 20upx)*1 / 3 - 6upx);
				}
			}
			.article_toolbar{
				display: flex;
				justify-content: flex-end;
				font-size: 20upx;
				padding-right: 20upx;
				height: 40upx;
				padding-top: 10upx;
				.article_toolbar_zan{
					margin-right: 20upx;
					.icon-dianzan{
						margin-right: 10upx;
					}
				}
				.article_toolbar_reply{
					.icon-xiaoxizhongxin{
						margin-right: 10upx;
					}
				}
			}
		}
	}
}
</style>

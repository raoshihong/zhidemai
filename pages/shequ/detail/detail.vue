<template>
	<view class="comment_content">
		<view class="comment_content_nav">
			<uni-nav-bar :fixed="true" :statusBar="true" :border="false">
				<view slot="left">
					<view class="iconfont icon-fanhui" @click="goBack"></view>
				</view>
				<view class="nav_title">
					<view>内容详情</view>
				</view>
				<view slot="right">
					<text class="iconfont icon-fenxiang"></text>
				</view>
			</uni-nav-bar>
		</view>
		<scroll-view class="comment_scroll" :scroll-y="true" :enable-flex="true">
			<view class="comment_content_detail">
				<view class="content_header">
					<view class="content_user_info" v-if="article.memberBo != undefined">
						<image :src="article.memberBo.headPortrait"></image>
						<view>{{article.memberBo.nickname}}</view>
					</view>
					<view class="shequ_recommend_guanzhu_btn">
						<text class="guanzhu_btn">+ 关注</text>
					</view>
				</view>	
				<view class="comment_content_text">
					<view class="comment_content_title">
							{{article.subject}}
					</view>
					<view class="comment_content_time">
						<text>{{article.datelineText}}</text>
						<text>浏览{{article.viewsText}}</text>
					</view>
					<view v-if="article.mixed != undefined && article.mixed.length>0">
						<view v-for="(mixedItem,index) in article.mixed" :key="index">
							<view class="comment_content_mixed_2" v-if="mixedItem.mixedType == 'TYPE_2'">
								<view><image :src="mixedItem.bigImageUrl" mode="widthFix"></image></view>
							</view>
							<view class="comment_content_mixed_0" v-if="mixedItem.mixedType == 'TYPE_1'">
								<text>{{mixedItem.data}}</text>
							</view>
							<view class="comment_content_mixed_1" 
								v-if="mixedItem.mixedType == 'TYPE_3'">
								<view><image :src="mixedItem.listImagePath"></image></view>
								<view class="comment_content_mixed_1_text">
									<view class="comment_content_mixed_1_name">{{mixedItem.name}}</view>
									<view class="comment_content_mixed_1_price">
										<view>¥{{mixedItem.price}}</view>
										<view class="iconfont icon-gouwuche-copy">加入购物车</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="comment_content_toolbar">
						<view  v-if="article.circleBo != undefined">
							<text class="iconfont icon-dangjianpengyouquan">{{article.circleBo.name}}</text>
						</view>
						<view>
							<text class="iconfont icon-dianzan">{{article.praise}}</text>
							<text class="iconfont icon-chakantiezigengduojubao">举报</text>
						</view>
					</view>
				</view>						
			</view>
			<view class="comment_list">
				<view class="comment_list_total">全部评论·{{totalRecord}}</view>
				<view class="comment_item" v-for="(comment,index) in commentList" :key="comment.pid">
					<view class="comment_member_icon">
						<image :src="comment.memberBo.headPortrait"></image>
					</view>
					<view class="comment_item_text">
						<view class="comment_item_name_date">
							<view class="comment_item_nickname">{{comment.memberBo.nickname}}</view>
							<view class="comment_item_datelineText">{{comment.datelineText}}</view>
						</view>
						<view class="comment_item_message">
							<text>{{comment.message}}</text>
						</view>
						<view class="comment_item_toolbar">
							<text class="iconfont icon-chakantiezigengduojubao">举报</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="comment_toolbar">
			<uni-easyinput class="uni-input"  confirm-type="send" placeholder="说点嘛呀说点嘛" />
			<button class="mini-btn" type="primary" size="mini">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tid:'',
				article:{
					mixed:[]
				},
				pageSize:10,
				pageIndex:1,
				totalPage:1,
				totalRecord:1,
				commentList:[]
			}
		},
		methods: {
			goBack:function(){
				uni.navigateBack({
					delta:1
				})
			},
			getContentDetail(){
				this.request({
					url:"https://newcommunity.jiuxian.com/community/getContentDetail.htm?apiVersion=1.0&appKey=40F5A668-75BA-426B-A061-0E87747884EB&appVersion=9.0.13&areaId=708&channelCode=0%2C1&cityName=%E6%B7%B1%E5%9C%B3%E5%B8%82&cpsId=appstore&deviceIdentify=40F5A668-75BA-426B-A061-0E87747884EB&deviceType=IPHONE&deviceTypeExtra=0&equipmentType=iPhone&lati=22.69156032986111&longi=113.8075547960069&netEnv=WIFI&pushToken=99afd004c81de8025248532ebf58ff4de2c7274741284af9f4388a58768822c8&screenReslolution=414.00x896.00&supportMixed=1&supportWebp=2&sysVersion=15.1",
					data:{
						tid:this.tid
					}
				}).then(res=>{
					this.article = res.data.result
				})
			},
			getContentDetailCommentList(){
				this.request({
					url:"https://newcommunity.jiuxian.com/community/getContentDetailCommentList.htm?apiVersion=1.0&appKey=40F5A668-75BA-426B-A061-0E87747884EB&appVersion=9.0.13&areaId=708&channelCode=0%2C1&cityName=%E6%B7%B1%E5%9C%B3%E5%B8%82&cpsId=appstore&deviceIdentify=40F5A668-75BA-426B-A061-0E87747884EB&deviceType=IPHONE&deviceTypeExtra=0&equipmentType=iPhone&lati=22.69156032986111&longi=113.8075547960069&netEnv=WIFI&pageIndex=1&pageSize=10&pushToken=99afd004c81de8025248532ebf58ff4de2c7274741284af9f4388a58768822c8&screenReslolution=414.00x896.00&supportWebp=1&sysVersion=15.1",
					data:{
						tid:this.tid
					}
				}).then(res=>{
					console.log("评论",res)
					this.pageIndex = res.data.result.pageIndex;
					this.pageSize = res.data.result.pageSize;
					this.totalPage = res.data.result.totalPage;
					this.totalRecord = res.data.result.totalRecord;
					this.commentList = res.data.result.dataList;
				})
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title:"内容详情"
			})
			this.tid = e.tid;
			this.getContentDetail();
			this.getContentDetailCommentList();
		}
	}
</script>

<style lang="scss" scoped>
.comment_content{
	.comment_content_nav{
		.nav_title{
			width: 100%;
			text-align: center;
			line-height: 84upx;
			font-size: 30upx;
			font-weight: 400;
		}
	}	
	
	.comment_scroll{
		width: 100%;
		// #ifdef H5 
		height: calc(100vh - 84upx - 84upx);
		// #endif
		// #ifndef H5 
		height: calc(100vh - 84upx - 84upx - 84upx - 20upx);
		// #endif 
		.comment_content_detail{
			margin: 20upx;
			.content_header{
				display: flex;
				justify-content: space-between;
				line-height: 100upx;
				border-bottom: solid 1upx #F0F0F0;
				padding-bottom: 10upx;
				.content_user_info{
					display: flex;
					image{
						width: 100upx;
						height: 100upx;
						border-radius: 50upx;
						margin-right: 20upx;
					}
				}
				.shequ_recommend_guanzhu_btn{
					.guanzhu_btn{
						margin-right: 10upx;
						border: 1upx solid #C8C7CC;
						font-size: 20upx;
						width: 100upx;
						padding-left: 10upx;
						padding-right: 10upx;
					}
				}
			}
			.comment_content_text{
				margin-top: 10upx;
				.comment_content_title{
					font-weight: 500;
				}
				.comment_content_time{
					font-size: 20upx;
					color: #CCCCCC;
				}
				.comment_content_mixed_0{
					font-size: 25upx;
				}
				.comment_content_mixed_1{
					margin-top: 10upx;
					background-color: #F0F0F0;
					display: flex;
					padding: 10upx;
					image{
						width: 120upx;
						height: 120upx;
					}
					.comment_content_mixed_1_text{
						width: 100%;
						margin-right: 10upx;
						.comment_content_mixed_1_name{
							margin-top: 30upx;
							margin-left: 20upx;
							font-size: 25upx;
						}
						.comment_content_mixed_1_price{
							display: flex;
							font-size: 20upx;
							margin-top: 20upx;
							margin-left: 20upx;
							justify-content: space-between;
						}
					}
					
				}
				.comment_content_mixed_2{
					margin-top: 10upx;
					image{
						width: 100%;
					}
				}
				.comment_content_toolbar{
					display: flex;
					justify-content: space-between;
					.icon-dianzan{
						font-size: 20upx;
					}
					.icon-dangjianpengyouquan{
						font-size: 20upx;
					}
					.icon-chakantiezigengduojubao{
						font-size: 20upx;
						margin-left: 30upx;
					}
					
				}
			}
		}
		
		.comment_list{
			.comment_list_total{
				border-left: 10upx #CC0001 solid;
				border-bottom: 1upx #F0F0F0 solid;
				margin-left: 20upx;
				padding-left: 20upx;
				margin: 20upx;
			}
			.comment_item{
				display: flex;
				margin: 20upx;
				.comment_member_icon{
					image{
						width: 80upx;
						height: 80upx;
						border-radius: 80upx;
					}
				}
				.comment_item_text{
					margin-left: 20upx;
					margin-right: 20upx;
					width: 100%;
					border-bottom: 1upx solid #F1F1F1;
					.comment_item_name_date{
						display: flex;
						justify-content: space-between;
						.comment_item_nickname{
							font-size: 30upx;
							font-weight: 500;
						}
						.comment_item_datelineText{
							color: #C8C7CC;
							font-size: 25upx;
						}
					}
					.comment_item_message{
						margin-top: 20upx;
						font-size: 25upx;
					}
					.comment_item_toolbar{
						.icon-chakantiezigengduojubao{
							font-size: 25upx;
							color: #C7C7C7;
						}
					}
				}
			}
		}
		
	}
	
	.comment_toolbar{
		background-color: #F0F0F0;
		padding: 20upx;
		display: flex;
		.uni-input{
			width: 80%;
			background-color: #FFFFFF;
			border-radius: 10upx;
		}
		.mini-btn{
			margin-left: 20upx;
			width: 20%;
			text-align: center;
			background-color: #FF5A5F;
			font-size: 30upx;
		}
	}
}
</style>

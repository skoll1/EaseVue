<template>
	<div class="recommend"  ref="recommend">
	<!-- ref相当于id -->
		<scroll class="recommend-content" :data="discList" ref='scroll'>
			<div>
				<div class="slider-wrapper" v-if="recommends.length">
					<slider>
						<div v-for="item in recommends">
							<a href="/">
								<img :src="item.pic" alt="" @load="loadImage" class="needsclick">
							</a>
						</div>
					</slider>
				</div>
				<div class="recommend-list">
					<h1 class="list-title">歌单推荐</h1>
					<ul>
						<li v-for="item in discList" class="item" @click="selectItem(item)">
							<div class="recommend-icon">
								<img v-lazy="item.coverImgUrl" width="60" height="60" >
							</div>
							<div class="recommend-text">
								<h5 class="name" v-html="item.name"></h5>
								<!-- <p class="desc" v-html="item.description"></p> -->
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="loading-container" v-show="!discList.length">
			<loading></loading>
			</div>
		</scroll>
		<router-view>
			
		</router-view>
	</div>
</div>
</template>
<script type="text/javascript">
	import {mapMutations} from 'vuex';
	import slider from '@/base/slider';
	import scroll from '@/base/scroll';
	import loading from '@/base/loading/l1';
	import {playlistMixin} from '@/common/js/mixScroll'
	export default{
		mixins:[playlistMixin],
		data(){
			return {
				recommends:[],
				discList:[],
			}
		},
		created(){
			this._getRecommend();
			this._getRecommend_list();
		},
		methods:{
			_getRecommend(){
				this.$ajax.get('api/banner').then((response)=>{
					// console.log(response.data);
					this.recommends=response.data.banners;
				})
			},
			_getRecommend_list(){
				this.$ajax.get('api/top/playlist?limit=20&order=hot').then((res)=>{
					// console.log(res.data)
					this.discList=res.data.playlists;
				})
			},
			selectItem(item){
				this.$router.push({
					path:`/recommend/${item.id}`
				})
				// console.log(item)
				this.setDist(item);

				
			},
			loadImage(){
				if(!this.checkLoaded){
				this.$refs.scroll.refresh();
				this.checkLoaded=true;
			  }
			},
			handlePlaylist(playlist){
				const bottom=playlist.length>0?'60px':''
				this.$refs.recommend.style.bottom=bottom
				this.$refs.scroll.refresh()
			},
			...mapMutations({
				setDist:"SET_DIST"

			})
			// 为什么这个是个对象
		},	
		components:{
			slider,
			scroll,
			loading,
		}
		
	}

</script>
<style>
	.recommend{
		position: fixed;
		width: 100%;
		top: 88px;
		bottom: 0;
	}
	.recommend-content{
		/*写错一个字母导致最外边的大小和里面的一样从而无法触发better-scroll的滑动条件*/
		height: 100%;
		overflow: hidden;
	}
	.recommend-list ul{
		/*padding-top: 20px;*/
		background-color:rgb(252,252,253);
	}
	.slider-wrapper{
		position: relative;
		width: 100%;
		overflow: hidden;
	}
	.list-title{
		height: 44px;
		line-height: 44px;
		text-align: center;
		font-size: 16px;
		color:#000;
		border-bottom: 1px solid #000;
	}
	.item{
		display: flex;
		box-sizing: border-box;;
		align-items: center;
		width: 90%;
		margin: 0 auto;
		height: 80px;
	}
	.recommend-icon{
		height: 60px;
		width: 60px;
	}
	.recommend-icon img{
		border-radius: 3px;
	}
	.recommend-text{
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex:1;
		line-height: 20px;
		overflow: hidden;
		font-size: 16px;
		/*background-color: red;*/
		margin-left: 10px;
	}
	.name{
		margin-bottom: 10px;
		color:#000;
	}
	.desc{
		color:#eee;
	}
	.loading-container{
		position: absolute;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
<template>
	<scroll class="suggest"
			:data="result"
			:pullup="pullup"
			@scrollToEnd="getMore"
			ref="suggest">
			<ul class="suggest-list" >
				<li @click="selectItem(item)" class="suggest-item" v-for="(value,key,index) in result">	
					<div class="suggest-content" v-if=" key == 'albums' ">
							<ul>
								<li v-for="(item,index) in value">
										<div class="suggest-icon" >
											<svg class="icon" aria-hidden="true" v-show="index==0">
											    <use xlink:href="#icon-zhuanji">    
													</use>
											</svg>

										</div>
										<div class="suggest-text">
											{{value[index].name}}
										</div>
								</li>
							</ul>
					</div>
					<!-- 显示唱片相关 -->
					<div class="suggest-content" v-if=" key == 'artists' ">
							<ul>
								<li v-for="(item,index) in value">
										<div class="suggest-icon" >
											<svg class="icon" aria-hidden="true" v-show="index==0">
											    <use xlink:href="#icon-geshou">    
													</use>
											</svg>
										</div>
										<div class="suggest-text">
											{{value[index].name}}
										</div>
								</li>
							</ul>
					</div>
					<!-- 显示歌手相关 -->
					<div class="suggest-content" v-if=" key == 'mvs' ">
							<ul>
								<li v-for="(item,index) in value">
										<div class="suggest-icon" >
											<svg class="icon" aria-hidden="true" v-show="index==0">
											    <use xlink:href="#icon-mv">    
													</use>
											</svg>
										</div>
										<div class="suggest-text">
											{{value[index].name}}
										</div>
								</li>
							</ul>
					</div>
					<!-- 显示mv相关 -->
					<div class="suggest-content" v-if=" key == 'playlists' ">
							<ul>
								<li v-for="(item,index) in value">
										<div class="suggest-icon" >
											<svg class="icon" aria-hidden="true" v-show="index==0">
											    <use xlink:href="#icon-ttpodicon-copy">    
													</use>
											</svg>
										</div>
										<div class="suggest-text">
											{{value[index].name}}
										</div>
								</li>
							</ul>
					</div>
					<!-- 显示短视屏 -->
					<div class="suggest-content" v-if=" key == 'songs' ">
							<ul>
								<li v-for="(item,index) in value">
										<div class="suggest-icon" >
											<svg class="icon" aria-hidden="true" v-show="index==0">
											    <use xlink:href="#icon-ttpodicon2">    
													</use>
											</svg>
										</div>
										<div class="suggest-text">
											{{value[index].name}}
										</div>
								</li>
								 <!-- <loading v-show="!hasMore"></loading> -->
							</ul>
					</div>
					<!-- 显示歌曲 -->
				</li>
				<loading v-show="hasMore"></loading>
			</ul>
	</scroll>
</template>
<script type="text/javascript">
	import scroll from '@/base/scroll'
	import loading from '@/base/loading/l11.vue'
	import noResult from '@/base/noResult/no1.vue'
	const limit=50
	export default{

		data(){
			return{
				hasMore:true,
				result:[],
				offset:0,
				page:1,
				pullup:true,
			}
		},
		props:{
			query:{
				type:String,
				default:null
			}
		},
		components:{
			scroll,
			loading,
			noResult,
		},
		methods:{
			_getResult(text){
				var _self=this;
				this.hasMore=true
				this.page=1
				this.$refs.suggest.scrollTo(0,0)
				this.$ajax.get('/api/search/suggest?limit='+limit+'&keywords='+text+'&offset'+this.page).then((result)=>{
						if(result.data.result){
							_self.result=result.data.result
							console.log(_self.result)
							this._checkMore(result.data.result)
						}
				})
			},
			_checkMore(list){
				if(!list.length){
					this.hasMore=false
				}
			},
			getMore(){
				if(!this.hasMore){
					return
				}
				this.page++
				this.$ajax.get('/api/search/suggest?limit='+limit+'&keywords='+text+'&offset'+page).then((result)=>{
						if(result.data.result){
							_self.result=_self.result.concat(result.data.result)
							console.log(_self.result)
							this._checkMore(result.data.result)
						}
				})


			}
		},
		watch:{
			query(newval){
				this._getResult(newval);
			}
		}
	}
</script>
<style>
	.suggest{
		height: 100vh;
		overflow:hidden;
		margin-top:10px;
	}
	.suggest-list{
		padding: 0 30px;
	}
	.suggest-item{
		display: flex;
		align-items:center;
		padding-bottom: 20px;
	}
	.suggest-content{
		width: 100%;
		list-style: none;
		border-radius:10px; 
	}
	.suggest-content ul{
		list-style: none;
	}
	.suggest-content ul li{
		display: flex;
		background: rgba(3, 169, 244, 0.77);
	}
	.suggest-icon{
		flex:0 0 30px;
		width: 30px;
		color:#fff;
	}
	.suggest-text{
		flex:1;
		padding-left: 10px;
		color:#fff;
		font-size: 13px;
		line-height: 26px;
	}
</style>
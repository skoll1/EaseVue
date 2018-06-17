<template>
	<div class="bigRank" ref="rank">
		<Scroll :data="indexs" class="toplist" ref="toplist">
				<ul>
					<li class="toplist-item" v-for="item in indexs" @click="selectitem(item)">
						<div class="img">
							<img width="100" height="100" v-lazy="item.coverImgUrl"/>
						</div>
						<ul class="songlist">
							<li class="toplist-song" v-for="(song,index) in item.tracks.slice(0,3)">
									<span class="bigRankNum">{{index+1}}</span>
									<span class="bigRankName">{{song.name}}</span>
									<span class="toplist-song-name">{{song.artists[0].name}}</span>
							</li>
						</ul>
					</li>
				</ul>
				<div class="loading-container" v-show="!indexs.length">
						<loading>
							
						</loading>
				</div>
		</Scroll>
		<router-view></router-view>
	</div>
</template>
<script type="text/javascript">
	import Scroll from '@/base/scroll'
	import loading from '@/base/loading/l10'
	import {mapMutations} from 'vuex'
	export default{
		data(){
			return {
				indexs:[],
			}
		},
		components:{
			Scroll,
			loading
		},
		methods:{
			selectitem(item){
				this.$router.push({
					path: `/rank/${item.id}`
				});
				this.setTopList(item)
				console.log('ok')
			},
			_getIndex1(){
				return this.$ajax.get('/api/top/list?idx=1')
				// 新歌
			},
			_getIndex2(){
				return this.$ajax.get('/api/top/list?idx=2')
				// 原创
			},
			_getIndex3(){
				return this.$ajax.get('/api/top/list?idx=3')
				// 飙升
			},
			_getIndex4(){
				return this.$ajax.get('/api/top/list?idx=4')
				// 电音
			},
			_getIndex17(){
				return this.$ajax.get('/api/top/list?idx=17')
				// 金曲
			},
			_getIndex18(){
				return this.$ajax.get('/api/top/list?idx=18')
				// 嘻哈
			},
			_getAll(){
				this.$ajax.all([this._getIndex1(),this._getIndex2(),this._getIndex3(),this._getIndex4(),this._getIndex17(),this._getIndex18()])
					.then(this.$ajax.spread((index1,index2,index3,index4,index17,index18)=>{
						// 这块可以先判断，成功在加，不成功显示别的
						this.indexs.push(index1.data.result);
						this.indexs.push(index2.data.result);
						this.indexs.push(index3.data.result);
						this.indexs.push(index4.data.result);
						this.indexs.push(index17.data.result);
						this.indexs.push(index18.data.result);

						// this.index1=index1;
						// this.index2=index2;
						// this.index3=index3;
						// this.index4=index4;
						// this.index17=index17;
						// this.index18=index18;
						// console.log(this.indexs)
				}))
			},
			...mapMutations({
				setTopList:'SET_TOPLIST'
			})
		},
		created(){
			this._getAll();
		},
	}
</script>
<style>
	.bigRank{
		position: fixed;
		width: 100%;
		top: 88px;
		bottom: 0;
	}
	.toplist{
		height: 100%;
		overflow: hidden;
	}
	.toplist-item{
		display: flex;
		margin: 0 20px;
		padding-top: 20px;
		height: 100px;
	}
	.toplist-item:last-child{
		padding-bottom: 20px;
	}
	.toplist-item .img{
		flex:0 0 100px;
		width: 100px;
		height: 100px;
		border-radius: 10px;
	}
	.toplist-item .songlist{
		flex:1;
		/*display: flex;
		flex-direction: column;
		justify-content: center;*/
		list-style: none;
		/*padding: 0 20px;*/
		padding-left: 17px;
		/*padding-top: 10px;*/
		height: 100px;
		overflow: hidden;
		background-size: #eee;
		color:#000;
		font-size: 15px;
	}
	.toplist-item .songlist li:nth-child(1) .bigRankNum{
		position: relative;
		left:-5px;
		color:red;
		font-size: 20px;
	}
	.toplist-item .songlist li:nth-child(2) .bigRankNum{
		color:rgba(244, 67, 54, 0.6);
		font-size: 18px;
		position: relative;
		left:-5px;
	}
	.toplist-item .songlist li:nth-child(3) .bigRankNum{
		color:rgba(244, 67, 54, 0.3);
		font-size: 16px;
		position: relative;
		left:-5px;
	}
	.toplist-song{
		line-height: 30px;
		white-space: nowrap;
		display: flex;
		padding: 2px;
	}
	.bigRankName{
		flex:3;
		max-width: 60vw;
		overflow:hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		min-width:90px;
		color:black; 
	}
	.toplist-song-name{
		color:darkgray;
		font-size: 10px;
		flex:1;
	}
	.loading-container{
		position: absolute;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
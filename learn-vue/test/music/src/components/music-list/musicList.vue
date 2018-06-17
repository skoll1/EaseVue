<template>
	<div class="music-list">
		<div class="back" @click="back">
			<span>
				<svg class="icon" aria-hidden="true">
							    <use xlink:href="#icon-fanhui"></use>
				</svg>
			</span>
		</div>
		<h1 class="title" v-html="title"></h1>
		<div class="bg-image" ref="bgImg" :style="bgStyleOk">
			<div class="play-wrapper" v-show="playShow">
				<div class="play" @click="random" ref="playBtn" v-show="songs.length>0">
					<i class="icon-play">*</i>
					<span class="text">随机播放全部</span>
				</div>
			</div>
			<div class="filter" ref="filter">
				
			</div>
		</div>
		<div class="bg-layer" ref="layer"></div>
		<scroll :data="songs" 
				@scroll="scroll" 
				:probe-type="probeType"
				:listen-scroll="listenScroll" 
				class="list" ref="list">
			
				<div class="song-list-wrapper">
					<songlist :songs="songs" @select="selectItem" :rank="rank"></songlist>
				</div>
				<div v-show="!songs.length" class="loading-container">
					<loading>
						123
					</loading>
				</div>
		</scroll>
	</div>
</template>
<script type="text/javascript">
	import scroll from '@/base/scroll'
	import loading from '@/base/loading/l5'
	import songlist from '@/base/songlist'

	import {mapActions} from 'vuex'
	import {playlistMixin} from '@/common/js/mixScroll'

	const RESERVED_HEIGHT=40

	export default{
			mixins:[playlistMixin],
			props:{
				bgImg:{
					type:String,
					default:'',
				},
				songs:{
					type:Array,
					default:[],
				},
				title:{
					type:String,
					default:'',
				},
				rank:{
					type:Boolean,
					default:false,
				}
				// 数据结构改变了，导致从排行榜过来的歌播出不了。。
	},
	data(){
		return {
			scrollY:0,
			playShow:true,
		}
	},
	methods:{
		back(){
			this.$router.back();
		},
		random(item,index){
			this.randomPlay({
				list:this.songs,
				index
			})
		},
		scroll(pos){
			// console.log('scroll');
			// console.log(this.imgHeight)
			this.scrollY=pos.y;
			// console.log(this.scrollY)

		},
		selectItem(item,index){
			this.selectPlay({
				list:this.songs,
				index
			})
			console.log('ok')
		},
		...mapActions([
			'selectPlay',
			'randomPlay'
			]),
		// 语法糖获取操作
		handlePlaylist(playlist){
				const bottom=playlist.length>0?'60px':''
				this.$refs.list.$el.style.bottom=bottom
				this.$refs.list.refresh();

		}
	},
	computed:{
		bgStyle(){
			return this.bgImg;
		},
		bgStyleOk(){
			return `background-image:url(${this.bgStyle})`
		},

	},
	created(){
		// 又是拼写错误
		this.probeType=3
		this.listenScroll=true

	},
	components:{
		loading,
		scroll,
		songlist,
	},
	mounted() {
		this.imgHeight=this.$refs.bgImg.clientHeight;
		this.minTranslateY=-this.imgHeight+RESERVED_HEIGHT;

		this.$refs.list.$el.style.top=`${this.imgHeight}px`;
	},
	watch:{
		scrollY(newY){

			let translateY=Math.max(this.minTranslateY,newY)

			let zIndex=0;
			let scale=1;
			let blur=1;
			let percent=Math.abs(newY/this.imgHeight);
			if(newY>0){
				scale=1+percent;
				zIndex=10;

			}else{
				blur=Math.max(0.5,1-percent);
			}

			// this.$refs.list.$el.style.overflow="auto";
			this.$refs.layer.style['transform']=`translate3d(0,${translateY}px,0)`;

			this.$refs.bgImg.style.opacity=blur;


			// console.log(newY);
			// console.log(blur);
			if(newY<this.minTranslateY){
				zIndex=10;
				this.$refs.bgImg.style.height=`${RESERVED_HEIGHT}px`
				this.$refs.bgImg.style.paddingTop=0;
				this.$refs.playBtn.style.display='none'
				this.$refs.bgImg.style.opacity=1;
				// 只要这个小于1就一定会在那个地方改变层级关系

			}else{
				this.$refs.bgImg.style.paddingTop='70%'
				this.$refs.bgImg.style.height=0
				this.$refs.playBtn.style.display='';
			}
			// this.$refs.bgImg.style.opacity=blur;
			this.$refs.bgImg.style.zIndex=zIndex;
			this.$refs.bgImg.style.transform=`scale(${scale})`;
		}
	}
}
</script>
<style>
	.music-list{
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: #eee;
	}
	.back{
		position: absolute;
		top: 0;
		left: 6px;
		z-index: 50;
	}
	.back span{
		position: relative;
		top:10px;
		left:5px;
	}
	.icon-back{
		display: block;
		padding:10px;
		font-size: 16px;
		color:#fef;
	}
	.title{
		position: absolute;
		top: 0;
		left: 10%;
		z-index: 40;
		width: 80%;
		text-align: center;
		line-height: 40px;
		font-size: 16px;
		color:#faf;
	}
	.bg-image{
		position: relative;
		width: 100%;
		height: 0;
		padding-top: 70%;
		transform-origin: top;
		background-size: cover;
		/*z-index: 9;*/
	}
	.play-wrapper{
		position: absolute;
		bottom: 20px;
		z-index: 1;
		width: 100%;
	}
	.play{
		box-sizing: border-box;
		width: 135px;
		padding: 7px 0px;
		margin: 0 auto;
		text-align: center;
		color:yellow;
		border-radius: 100px;
		font-size: 0;
	}
	.icon-play{
		display: inline-block;
		vertical-align: middle;
		margin-right: 6px;
		font-size: 15px;
	}
	.text{
		display: inline-block;
		vertical-align: middle;
		font-size: 15px;
	}
	.filter{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background:rgba(7,17,27,0.4);
	}
	.bg-layer{
		position: relative;
		height: 100%;
		background:#fff;
	}
	.list{
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		background:#fff;
		/*overflow: hidden;*/
		/*z-index: 10;*/
	}
	.song-list-wrapper{
		padding: 20px 30px;
	}
	.loading-container{
		position: absolute;
		width: 100%;
		top: 50%;
		transition: translateY(-50%);
	}
</style>
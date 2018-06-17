<template>
	<div class="player" v-show='playlist.length>0'>
		<transition name="normal"
					@enter="enter"
					@after-enter="afterEnter"
					@leave="leave"
					@after-leave="afterLeave"
					:duration="1000">
			<div class="normal-player" v-show="fullScreen">
			
				<div class="background">
					<img :src="bgImg" alt="" width="100%" height="100%">
				</div>

				<!-- src -->
				<div class="top">
					<div class="back" @click="back">
						<i class="icon-back">
							<svg class="icon" aria-hidden="true">
							    <use xlink:href="#icon-fanhui"></use>
							</svg>
						</i>
					</div>
					<h1 id="title" v-html="currentSong.name"></h1>
				<h2 class="subtitle" v-html="currentSong.ar[0].name"></h2>
				</div>
				

				<div class="middle"
					 ref="middle"
					 @click="toggleShow"
					>
					<div class="cd-wrapper" 
						 ref="cdWrapper" 
						 @touchstart.prevent="middleTouchStart"
						 @touchmove.prevent="middleTouchMove"
					     @touchend.prevent="middleTouchEnd"
						 v-show="currentShow">
							<!-- 显示cd -->
						<div class="cd" :class="zhuan">
							<img :src="bgImg" class="image" width="37vh">
						</div>
						<div class="currentLyricLines">
							{{currentLyricLines}}
						</div>
					</div>
					<scroll class="geci" 
							ref="lyricList" 
							:data="currentLyric && currentLyric.lines">
		            <div class="geci-inner">
		              <div v-if="currentLyric">
		                <p ref="lyricLine"
		               
		                   :class="{'currentText': currentLineNum ===index}"
		                   v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
		              </div>
		            </div>
		          </scroll>
				</div>

				
				<div class="bottom">
					<!-- <div class="dot-wrapper">
						<span class="dot"></span>
						<span class="dot"></span>
					</div> -->

					<div class="progress-wrapper">
						<div class="progressTime">
								<span class="time time-l">
										{{_changeTime(currentTime)}}
								</span>
						</div>
						<div class="progress-bar-wrapper">
								<progressbar :time="precents" :init="init" @percentChange="onPregressBarChange"></progressbar>
						</div>
						<div class="progressTime">
								<span class="time time-r">
									{{_changeTime(duration)}}
								</span>
						</div>
					</div>
					<div class="operators" @click="">
						<div class="i-left" @click="changeMode">
							<div class="shunxu justify-content" v-if="this.mode == 1">
									<div>
										<svg class="icon" aria-hidden="true">
										    <use xlink:href="#icon-shunxu"></use>
										</svg>
									</div>
							</div>
							<div v-if="this.mode == 2">
								<div class="suiji justify-content">
									
										<svg class="icon" aria-hidden="true">
										    <use xlink:href="#icon-suiji"></use>
										</svg>
									
								</div>
							</div>
							<div v-if="this.mode == 0">
								<div class="danqu justify-content">
										<svg class="icon" aria-hidden="true">
										    <use xlink:href="#icon-ttpodicon1"></use>
										</svg>
								</div>
							</div>
						</div>
						<div class="i-last justify-content" @click="last" :class="disableClass">
							<div>
								<svg class="icon" aria-hidden="true">
								    <use xlink:href="#icon-xiayiqu"></use>
								</svg>	
							</div>
						</div>
						<div class="i-center justify-content" @click="togglePlay" :class="disableClass">
							<div v-if="playing == true ">
								<svg class="icon" aria-hidden="true">
							    	<use xlink:href="#icon-zanting"></use>
								</svg>
							</div>
							<div v-if="playing == false ">
								<svg class="icon" aria-hidden="true">
							    	<use xlink:href="#icon-zanting1"></use>
								</svg>
							</div>
						</div>
						<div class="i-next justify-content" @click="next" :class="disableClass">
							<div>
								<svg class="icon" aria-hidden="true">
							    	<use xlink:href="#icon-xiayiqu"></use>
								</svg>
							</div>
						</div>
						<div class="i-like justify-content">
							<div>
								<svg class="icon" aria-hidden="true">
								    <use xlink:href="#icon-wangyiyunyinle"></use>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		</transition>



		<transition name="mini">
			<div class="mini-player" v-show="!fullScreen" @click="open">
				<div class="ii" :class="zhuan">
					<img :src="bgImg" alt="" width="40" height="40">
				</div>
				<div class="text">
					<h2 class="name" v-html="currentSong.al.name"></h2>
					<p class="desc"></p>
				</div>
				<div class="control">
						<div class="mini-icon" @click.stop="togglePlay">
							<div v-if="playing == true ">
								<svg class="icon" aria-hidden="true">
							    	<use xlink:href="#icon-zanting"></use>
								</svg>
							</div>
							<div v-if="playing == false ">
								<svg class="icon" aria-hidden="true">
							    	<use xlink:href="#icon-zanting1"></use>
								</svg>
							</div>
						</div>
				</div>

			</div>
		</transition>
		<audio  ref="audio" 
				:src="currentSongUrl"
				@play="ready"
				@error="songError"
				@timeupdate="updateTime"
				@ended="end"
				@loadedmetadata="loadedmetadata"
  				></audio>
	</div>
</template>
<script type="text/javascript">
	import {mapGetters,mapMutations,mapActions} from 'vuex'
	// 取出数据来控制图像
	import animations from 'create-keyframe-animation'
	import Progressbar from '@/components/progress/progress'
	import {playMode} from '@/common/js/config.js'
	import {shuff} from '@/common/js/utis.js'
	import Lyric from 'lyric-parser'
	import Scroll from '@/base/scroll'
	export default{
		data(){
			return {
				currentSongUrl:"",
				onReady:false,
				currentTime:null,
				duration:null,
				precents:null,
				init:null,
				currentLyric:null,
				currentShow:true,
				currentLineNum:0,
				currentLyricLines:'歌词正在加载...'
			}
		},


		computed:{
			...mapGetters([
				'currentIndex',
				'fullScreen',
				'playing',
				'playlist',
				'currentSong',
				'mode',
				'sequenceList',
				// 显示影藏都会依赖这个数据
				]),

			// currentSongId(){
			// 	this._getMusicUrl(this.currentSong.id)
				
			// }
			// 
			// 出现的情况是只有打开Vue调试界面才会出现

			zhuan(){
				return this.playing ? "cdplay":" cdplay cdpause"
			},
			bgImg(){
				if(this.currentSong){
					return this.currentSong.al.picUrl
				}else{
					return false;
				}
				
			},

			// 计算style属性
			disableClass(){
				return this.onReady?'':'disable'
			}

		},

		methods:{
			...mapMutations({
				setFullScreen:'SET_FULL_SCREEN',
				setPlayState:'SET_PLAYING_STATE',
				setCurrentIndex:'SET_CURRENT_INDEX',
				setPlayMode:'SET_PLAY_MODE',
				setPlayList:'SET_PLAYLIST',

			}),


			back(){
				this.init=new Date()
				this.setFullScreen(false)
			},
			open(){
				this.setFullScreen(true)
			},
			togglePlay(){
				if(!this.onReady){
					return 
				}
				this.setPlayState(!this.playing);
				if(this.currentLyric){
					this.currentLyric.togglePlay();
				}
			},
			toggleShow(){

				this.currentShow=!this.currentShow
				// console.log(this.$refs.lyricList)
				if(this.currentShow){
					this.$refs.lyricList.$el.style.opacity=0
				}else{
					this.$refs.lyricList.$el.style.opacity=1
				}
				
			},
			next(){
				this.init=new Date()
				if(this.playlist.length==1){
					this.loop()
				}else{
					if(!this.onReady){
					return
				}
				let index=this.currentIndex+1;
				if(index===this.playlist.length){
					index=-1;
				}
				this.setCurrentIndex(index)
				if(!this.playing){
					this.togglePlay();
				}
				this.onReady=false
				}
			},
			last(){
				this.init=new Date()
				if(this.playlist.length==1){
					this.loop()
				}else{
					if(!this.onReady){
					return
					// 标志位做限制
				}
				let index=this.currentIndex-1;
				if(index=== -1){
					index=this.playlist.length
				}
				this.setCurrentIndex(index)
				if(!this.playing){
					this.togglePlay();
				}
				this.onReady=false
				}
			},
			ready(){
				this.onReady=true;
				// console.log(this.onReady)
			},
			songError(){
				this.onReady=false;
			},
			end(){
				if(this.mode==0){
					this._loop()
				}
				this.next();
				// this.togglePlay();
				console.log('end')
				// this.currentIndex++
			},
			updateTime(e){
				this.currentTime=e.target.currentTime
				this.precents=(this.currentTime/this.duration).toFixed(2);
				Number(this.precents)
				// console.log(e.target)
				// audio显示的是一样啊
				// console.log(this.$refs.audio.duration)
				// console.log(this.$refs.audio.buffered)
			},
			loadedmetadata(e){
				this.duration=this.$refs.audio.duration;

				// console.log(this.$refs.audio.duration)
				// 值是都一样的，但就是不相等
				// console.log(e.target)
				// audio.那这些都是属性么？这个还不一样。。。。

				// 事件有点乱
			},
			onPregressBarChange(precent){
				this.$refs.audio.currentTime=this.duration*precent
				if(!this.playing){
					this.togglePlay()
				}
				if(this.currentLyric){
					this.currentLyric.seek(this.duration*precent*1000)
				}
			},

			changeMode(){
				const mode=(this.mode+1)%3

				this.setPlayMode(mode);

				var list=null;
				if(this.mode==2){
					console.log(this.sequenceList)
					list=shuff(this.sequenceList)
					console.log(list)
				}else{
					list=this.sequenceList
					console.log('ok')
				}

				// this.setPlayList(list);
				// this._resetCurentIndex(list);

			},
			_resetCurentIndex(list){
				let index=list.findIndex((item)=>{
					return item.id=this.currentSong.id
				})
			},
			_changeTime(el){
				el=el|0
				const mins=Math.floor(el/60)
				var secs=String(Math.floor(el % 60))
				// console.log(secs.length)
				if(secs<10){
					var ses='0'+secs;
				}else{
					ses=secs;
				}
				// console.log(ses)
				// secs.padEnd(2,'0')
				// 这个函数也太不好用了。
				return `${mins}:${ses}`

			},
			_loop(){
				this.$refs.audio.currentTime=0;
				if(this.currentLyric){
					this.currentLyric.seek(0)
				}
			},


			enter(el,done){
				const {x,y,scale}=this._getPosAndScale();
				let animation={
					0:{
						transform:`translate3d(${x}px,${y}px,0) scale(${scale})`
					},
					60:{
						transform:`translate3d(0,0,0) scale(1.1)`
					},
					100:{
						transform:`translate3d(0,0,0) scale(1)`
					}
				}

				animations.registerAnimation({
					name:'move',
					animation,
					presets:{
						duration:400,
						easeing:'linear'
					}
				})

				animations.runAnimation(this.$refs.cdWrapper,'move',done)
			},
			afterEnter(){
					animations.unregisterAnimation('move')
					this.$refs.cdWrapper.style.animation=''
			},
			leave(el,done){
				this.$refs.cdWrapper.style.transition='all 0.4s'
				const {x,y,scale}=this._getPosAndScale()
				this.$refs.cdWrapper.style.transform=`translate3d(${x}px,${y}px,0) scale(${scale})`
				this.$refs.cdWrapper.addEventListener('transitionend',done)
			},
			afterLeave(){
				this.$refs.cdWrapper.style.transition=''
				this.$refs.cdWrapper.style.transform=''
			},
			_getPosAndScale(){
				const targetW=40
				const paddingL=40
				const paddingB=30
				const paddingT=80
				const width =window.innerWidth*0.8
				const scale=targetW/width

				const x=-(window.innerWidth/2-paddingL)
				const y=window.innerHeight-paddingT-width/2-paddingB

				return {
					x,y,scale
				}
			},
			_getMusicUrl(id){
				var _self=this
				this.$ajax.get('api/music/url?id='+id).then((respon)=>{
					// console.log(respon.data)
					_self.currentSongUrl=respon.data.data[0].url
					// console.log(_self.currentSongUrl)
				})
			},
			_getMusicInfo(id){
				// this.$ajax.get('api/song/detail?ids='+id).then((respon)=>{
				// 	console.log(respon.data)
				// })
			},
			_getSongLyric(id){
				console.log('lyric')
				var _self=this

				this.$ajax.get('api/lyric?id='+id).then((respon)=>{
					console.log('lyric')
					// console.log(respon);

					_self.currentLyric=new Lyric(respon.data.lrc.lyric,this.handleLyric)

					if (_self.playing) {
			            _self.currentLyric.play()
			          }
					// console.log(_self.currentLyric)
					// jsbase64解析base编码，歌词部分用到。
				}).catch((e)=>{
					// console.log(e)
					this.currentLyric=null;
					this.currentLineNum=0;
					this.currentLyric='';
					// 歌词不知道为啥获取不了
				})
			},
			handleLyric({lineNum,txt}){
				this.currentLineNum=lineNum
				// console.log(this.$refs.lyricList)
				console.log(lineNum)
				if (lineNum > 5) {
		          let lineEl = this.$refs.lyricLine[lineNum - 5]
		          this.$refs.lyricList.scrollToElement(lineEl, 1000)
		        }
		        else {
		          this.$refs.lyricList.$el.scrollTo(0, 0, 1000)
		        } 
		        this.currentLyricLines=txt;

			},
			middleTouchStart(e){
				console.log(e)
				const touchs=e.touches[0]
				this.touch.inited=true
				this.touch.touchX=touchs.pageX

			},
			middleTouchMove(e){
				if(!this.touch.inited){
					return 
				}
				console.log(this.touch)
				const dis=e.touches[0].pageX-this.touch.touchX;
				if(dis<0){
					this.touch.newdis=Math.max(-160,dis)
				}else{
					this.touch.newdis=Math.min(160,dis)
				}
				this.$refs.cdWrapper.style.transform=`translate3d(${this.touch.newdis}px,0,0)`
				console.log(this.touch.newdis)
			},
			middleTouchEnd(){
				if(this.touch.newdis>15&&this.currentIndex>0){
					this.last()
					this.$refs.cdWrapper.style.transform=`translate3d(0,0,0)`
				}else{
					this.$refs.cdWrapper.style.transform=`translate3d(0,0,0)`
				}

				if(this.touch.newdis<-15&&this.currentIndex<this.playlist.length){
					this.next()
					this.$refs.cdWrapper.style.transform=`translate3d(0,0,0)`
				}else{
					this.$refs.cdWrapper.style.transform=`translate3d(0,0,0)`
				}
				console.log('end')
			}
		},
		created(){
				this.touch={
					inited:false,
				}
				// 不需要添加getter和setter,所以在这里定义。
		},
		watch:{
			currentSongUrl(newSong,oldSong){
				// if(newSong.id===oldSong.id){
				// 	return
				// }
				if(this.currentLyric){
					this.currentLyric.stop();
				}
				setTimeout(()=>{
					this.$refs.audio.play()
				},1000)
			},
			playing(newPlaying){
				this.$nextTick(()=>{
					const audio = this.$refs.audio;
					newPlaying ? audio.play() : audio.pause()
				})
			},
			currentSong(newSong,oldSong){
				// console.log(newSong.id)
				// console.log(oldSong.id)
				// 不用判断，默认是不会变的。
				this._getMusicUrl(this.currentSong.id);
				// this._getMusicInfo(this.currentSong.id)
				console.log('currentSong')
				this._getSongLyric(this.currentSong.id);
			},
			// currentLineNum(newNum){
			// 	console.log(newNum)
			// 	if(newNum>5){
			// 		// console.log(this.$refs.lyricList)
			// 		let lineEl = this.$refs.lyricLine[newNum - 5]
		 //          	this.$refs.lyricList.scrollToElement(lineEl, 1000)
			// 	}
			// }
		},
		components:{
			Progressbar,
			Scroll,
		},

	}

	// 进度条延迟问题如何解决
	// 歌词Bug:因为那个隐藏的问题导致后面一堆问题，能不能先先加载之后在v-show,v-if的区别
	// 下一曲出现乱码。用watch都解决不了
	// 从歌词那页返回就会导致Bug,必须从人物那个页面返回。。。。


	// key是每个都要放还是只放在总的啊
	// scroll一开始影长都不行，那就只能给他加透明度了
</script>





<style>
	.normal-player{
		position: fixed;
		display: flex;
		flex-direction: column;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: #eee;
	}
	.background{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		opacity: .6;
		filter: blur(20px)
	}
	.top{
		position: absolute;
		width: 100%;
		/*margin-bottom: 25px;*/
		height:50px;
		border-bottom: 1px solid rgba(255,255,255,.5);

	}
	.back{
		position: absolute;
		top: 0;
		left: 6px;
		z-index: 50;
	}
	.normal-player .icon-back{
		display: block;
		padding: 9px;
		font-size: 16px;
		color:#000;
		/*transform: rotate(-90deg)*/
	}
	.normal-player  #title{
		width: 70%;
		margin: 0 auto;
		line-height: 35px;
		text-align: center;
		font-size: 16px;
		color:#fff;
	}
	.subtitle{
		line-height: 3px;
		text-align: center;
		font-size: 12px;
		color:#eee;
	}
	.middle{
		flex:1;
		width: 100%;
		height: 80vh;
		justify-content: center;
		align-items: center;
		display: flex;

	}
	.cd{
		width: 35vw;
		height: 35vw;
		border:23vw solid #000;
		border-radius: 50%;
		overflow: hidden;
		box-shadow:1px 0px 20px 3px rgba(0,0,0,.5);
		z-index: 1;
	}
	.cd-wrapper{
		position: relative;
	    top: -10%;
	}
	.cdplay{
		animation:  rotate 20s linear infinite
	}
	.cdpause{
		animation-play-state: paused;
	}
	.normal-player .image{
		width:37vw;
	}
	.geci{
		width: 70%;
		font-family: cursive;
	    font-size: 17px;
	    position: absolute;
	    height: 67%;
	    top: 13%;
	    text-align: center;
	    line-height: 35px;
	    color:rgba(252, 252, 252, 0.54);
	    overflow: hidden;
	    opacity: 0;
	    transition:opacity 0.2s 0 ease-in;
	    z-index: -1;
	}
	.geci-inner{
		width: 100%;
		/*height: 100%;*/
		/*还不能把他搞的不见了。。。*/
		overflow: hidden;
	}
	.currentText{
		color:#fff;
		font-size: 20px;
	}
	.currentLyricLines{
		position: relative;
	    top: 40px;
	    font-size: 16px;
	    font-family: cursive;
	    text-align: center;
	    color: rgba(255, 255, 255, 0.87);
	}


	.normal-player .bottom{
		position: absolute;
		bottom: 0px;
		height: 120px;
		width: 100%;
		/*border-top:1px solid rgba(255,255,255,.5) ;*/
	}
	.dot-wrapper{
		text-align: center;
		font-size: 0;
	}
	.dot{
		display: inline-block;
		vertical-align: middle;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #fff;
	}
	.dot .ctive{
		width: 20px;
		border-radius:5px;
		background: yellow;
	}


	.progress-wrapper{
		display: flex;
		align-items: center;
		width: 90%;
		margin: 0 auto;
		padding: 10px 0;		
	}
	.normal-player .item{
		color:green;
		font-size: 14px;
		flex:0 0 30px;
		line-height: 30px;
		width: 30px;
	}
	.normal-player .item .time-l{
		text-align: left;
	}
	.normal-player .item .item-r{
		text-align: right;
	}
	.progressTime{
		color:#fff;
		font-size: 16px;
		width: 25px;
		height: 25px;
	}

	.progress-bar-wrapper{
		flex:10;
	}

	.operators{
		display: flex;
		align-items: center;
		justify-content: center;
		/*position: absolute;
		bottom: 0;*/
		color:#fff;
	}
	.operators .icon{
		width: 40px;
		height:40px;
	}
	.normal-player .ii{
		color:red;
	}
	.normal-player .ii .disable{
		color:#000;
		/*font-size: 30px;*/
	}
	/*i{
		font-size: 30px;
	}*/
	.justify-content{
		display: flex;
		justify-content: center;
	}
	.i-left{		
		flex:1;
	}
	.i-last{
		flex:1;
		transform: rotate(180deg)
	}
	.i-center{
		flex:2;
	}
	.i-next{
		flex:1;
	}
	.i-like{
		flex:1;
	}






	.mini-player{
		display: flex;
		align-items: center;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 180;
		width: 100%;
		height: 60px;
		background: #eee;
	}

	.mini-player .ii{
		flex:0 0 40px;
		width: 40px;
		padding:0 10px 0 20px;
	}
	.mini-player img{
		border-radius: 50%;
	}
	.mini-player img .play{
		animation: rotate 10s linear infinite;
	}
	.mini-player img .pause{
		animation-play-state: paused
	}

	.mini-player text{
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex:1;
		line-height: 20px;
		overflow: hidden;
		overflow: hidden;
	}

	.mini-player .name{
		margin-bottom: 2px;
		font-size: 15px;
		color:red;
	}
	.mini-player .desc{
		font-size: 13px;
		color:red;
	}

	.mini-player .control{
		flex:0 0 30px;
		width: 30px;
		padding:0 10px;	
	}

	.mini-player .icon-play-mini, .icon-pause-mini, .icon-playlist{
		font-size: 30px;
		color:red;
	}
	.mini-player .icon-mini{
		font-size: 32px;
		position: absolute;
		left: 0;
		top: 0;
	}


	@keyframes rotate{
		0%{
			transform:rotate(0);
		}
		100%{
			transform: rotate(360deg)
		}
	}


	.normal-enter-active, .normal-leave-active{
		transition: all 0.4s
		/*normal绑定的transiton中分成了两个部分，这两个控制过渡的时间和曲线以及。。。或者说这个就是transition的语法*/
	}
	.normal-enter-active, .normal-leave-active .top,.bottom{
		transition: all 0.4s cubic-bezier(0, 0, 0.46, 1.33)
	}


	.normal-enter, .normal-leave-to{
		opacity: 0;
		/*具体的效果*/
	}
	.normal-enter, .normal-leave-to .top{
		transform: translate3d(0, -100px, 0);
		
	}

	.normal-enter, .normal-leave-to .bottom{
		transform: translate3d(0, 100px, 0)
		/*transform: scale(0.1);*/
	}



	/*mini动画*/
	.mini-enter-active, .mini-leave-active{
			transition: all 0.4s
	}
	
	.mini-enter, .mini-leave-to{
		opacity: 0;
	}
	
	.disable{
		color:#eee;
	}
</style>
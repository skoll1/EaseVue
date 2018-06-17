<template>
	<div class="progress-bar" ref="progressBar" @click="progressClick">
		<div class="bar-inner" >
			<div class="progress" ref="progress" key="init">
				
			</div>
			<div class="progress-btn-wrapper"
				@touchstart.prevent="progressTouchStart"
				@touchmove.prevent="progressTouchMove"
				@touchend="progressTouchEnd"
				 ref="progressBtnWrapper">
						<div class="progress-icon" >
								<!-- <svg class="icon" aria-hidden="true">
								    <use xlink:href="#icon-yinle"></use>
								</svg> -->
								<!-- 图标又显示不出来了 -->
						</div>
			</div>
		</div>
	</div>
</template>
<style>
	.progress-bar{
		height: 30px;
		width: 90%;
		margin: 0 auto; 
		/*background: red;*/
	}
	.bar-inner{
		position: relative;
		top: 13px;
		height: 4px;
		border-radius:10px;
		background:rgba(0,0,0,0.3);
	}
	.progress{
		position: absolute;
		height: 4px;
		border-radius: 3px;
		background:#fff;

	}
	.progress-btn-wrapper{
		position: absolute;
	}
	.progress-icon{
		position: relative;
		background:#2196F3;
		border-radius: 50%;
	    width: 5px;
	    height: 5px;
	    border: 5px solid #fff;
	    top:-5px;
	  
	}
</style>
<script type="text/javascript">
	const progressBtn=20
	export default{
		props:{
			time:{
				type:String,
				default:0
			},
			init:{
				type:Date,
				default:0
			}
		},
		created(){
			this.touch={
				initiated:false
			}
			// 保存数据
		},
		methods:{
			progressTouchStart(e){
				this.touch.initiated=true
				// 设置一个标志位
				this.touch.startX=e.touches[0].pageX
				this.touch.left=this.$refs.progress.clientWidth

			},
			progressTouchMove(e){
				if(!this.touch.initiated){
					return 
				}
				const disX=e.touches[0].pageX-this.touch.startX
				const offsetWidth=Math.min(this.$refs.progressBar.clientWidth,Math.max(0,this.touch.left+disX))
				this._offset(offsetWidth)
			},
			progressTouchEnd(){
				this.touch.initiated=false
				this._triggerPercent()
			},
			progressClick(e){
				// 点击到按钮的时候是没有效果的
				// this._offset(e.offsetX)
				// 获取pageX

				const rect=this.$refs.progressBar.getBoundingClientRect().left
				const offsetWidth=e.pageX-rect;
				this._offset(offsetWidth);

				this._triggerPercent()
			},
			_offset(offsetWidth){
				this.$refs.progress.style.width=`${offsetWidth}px`
				const offsetchangeWidth=offsetWidth-3
				// console.log(offsetchangeWidth)
				this.$refs.progressBtnWrapper.style.transform=`translate3d(${offsetchangeWidth}px,0,0)`
			},
			_triggerPercent(){
				const barWidth=this.$refs.progressBar.clientWidth
				const percent=this.$refs.progress.clientWidth/barWidth
				this.$emit('percentChange',percent)
			},
		},
		watch:{
			time(newPrecent){
				// console.log(newPrecent)
				if(newPrecent>0&& !this.touch.initiated){
					// 提升他的优先级
					const barWidth=this.$refs.progressBar.clientWidth-5;
					const offset=newPrecent*barWidth
					// console.log(offset)
					this._offset(offset)

				}
				// console.log(this.time)
			},
			init(newDate){
					this._offset(0);
					// data变化然后进度条立马重置。
				}
		}

	}
</script>
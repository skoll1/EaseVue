<template>
	<scroll 
			class="listview" 
			ref="listview" 
			:data="data"
			@scroll="scroll"
			:listen-scroll="listenScroll"
			:probe-type="probeType"			
			>
		<ul>
			<li v-for="group in data" class="list-group" ref="listGroup">
				<h2 class="list-group-title" v-html="group.id"></h2>
				<ul>
					<li @click="selectItem(item)"  v-for="item in group.artists" class="list-group-item" :id="item.id">
						<img v-lazy="item.img1v1Url" alt="" class="avatar">
						<span class="name">{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStart"
		 @touchmove.stop.prevent="onShortcutTouchMove" @touchend.stop>
			<ul>
				<li v-for="(item,index) in shortcutList" 
							:data-index="index"
							:class="{'current':currentIndex===index}"
							class="list-shortcut-item">{{item}}</li>
			</ul>
		</div>
		<div class="list-fixed" ref="fixed" v-show="fixedTitle">
			<h1 class="fixed-title">{{fixedTitle}}</h1>
		</div>
		<div v-show="!data.length" class="loading-container">
			<loading></loading>
		</div>
	</scroll>
</template>
<!-- 类通讯录组件 -->
<script type="text/javascript">
	import Scroll from '@/base/scroll'
	import loading from '@/base/loading/l3'
	import {getDate} from '@/common/js/dom'

	// 定义常量可以在这个里面
	const ANCHOR_HEIGHT=18
	const TITLE_HEIGHT = 30
	export default{
		created(){
			// 为什么有的初始化数据在create()里面设置，有的在data里面设置。
			this.touch={}
			this.listenScroll=true
			this.probeType=3
			this.listHeight=[]

		},
		props:{
			// 又是这里拼写错误...
			data:{
				type:Array,
				defatult:[],
			}
		},
		data(){
			return {
				shortcutList:['热','A','B','C','D','F','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
				scrollY:-1,
				currentIndex:0,
				diff:-1
			}
		},
		computed:{
			fixedTitle(){
				if(this.scrollY>0){
					return '';
				}
				return this.data[this.currentIndex]? this.shortcutList[this.currentIndex]:''
			}
		},
		methods:{
			selectItem(item){
				this.$emit('select',item);
			},
			onShortcutTouchStart(e) {
		        let anchorIndex = getDate(e.target, 'index')

		        let firstTouch = e.touches[0]
		        this.touch.y1 = firstTouch.pageY
		        this.touch.anchorIndex = anchorIndex

		        this._scrollTo(anchorIndex)
		      },
			onShortcutTouchMove(e){
				let firstTouch=e.touches[0]
				this.touch.y2=firstTouch.pageY

				let dis=(this.touch.y2-this.touch.y1)/ANCHOR_HEIGHT|0
				let anchorIndex=parseInt(this.touch.anchorIndex)+dis;

				this._scrollTo(anchorIndex)
				// 两个事件都需要用到公共函数，所以在此封装一个新的函数，
			},
			_scrollTo(index){
				// 找到数据驱动的源头

				if(!index&&index!==0){
					return 
				}
				// 多余的其他点击的地方。

				if(index<0){
					index=0
				}else if(index>this.listHeight.length-2){
					index=this.listHeight.length-1;
					// 向下边界（点击的边界处理）
				}
				// this.scrollY=-this.listHeight[index];
				this.scrollY = -this.listHeight[index]
				// 第一次点老是到不了。。。。


				// console.log(this.scrollY)
				// 这里做的仅仅是让scrollY的值改变

				this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
				// 是否添加滑动缓冲。

			},
			scroll(pos){
				this.scrollY=pos.y;
				// console.log(this.scrollY);
			},
			_calculateHeight(){
				this.listHeight=[]
				const list=this.$refs.listGroup
				let height=0

				this.listHeight.push(height);

				for(let i=0;i<list.length;i++){
					let item=list[i]
					height+=item.clientHeight
					this.listHeight.push(height)
				}
			},
			// 计算每个group的高度
			refresh(){
				this.$refs.listview.refresh()
			}



		},
		components:{
			Scroll,
			loading
		},
		watch:{
			data(){
				setTimeout(()=>{
					this._calculateHeight()
				},20)
			},
			scrollY(newY){
				const listHeight=this.listHeight;
				// console.log(newY);
				// 这里收到的值和前面传的有关，scroll组件里面。

				// 当页面滚动到顶部，newY>0
				if(newY>0){
					this.currentIndex=0;
					return 
				}

				// 在中间滚动
				for(let i=0;i<listHeight.length-1;i++){
					let height1=listHeight[i]
					let height2=listHeight[i+1]

					if(-newY >= height1 && -newY < height2){
						this.currentIndex=i;
						this.diff=height2+newY
						return 
					}
				}

				// 当滚动到底部的时候，且最后-newY大于最后一个元素的上限
				this.currentIndex=listHeight.length-2
			},
			diff(newVal){
				let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
					if (this.fixedTop === fixedTop) {
				          return
				        }
		        this.fixedTop = fixedTop
		        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
					}
			}
	}
</script>
<style>
	.listview{
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-color: #eee;
	}
	.list-group{
		padding-bottom: 30px;
	}
	.list-group-title{
		height: 30px;
		line-height: 30px;
		padding-left: 45px;
		font-size: 16px;
		color:red;

		background-color:#000;
	}
	.list-group-item{
	   display: flex;
	   align-items: center;
	   padding: 20px 0 0 30px;
	}
	.avatar{
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}
	.name{
		margin-left: 30px;
		/*color:red;*/
		font-size: 16px;
	}
	.list-shortcut{
		height: 400px;
		position: absolute;
		z-index: 30;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 18px;
		border-radius: 10px;
		text-align: center;
		background: #C20C0C;
		font-family: 'Helvetica';
		color:#fff;	
	}
	.list-shortcut ul{
		list-style: none;
	}
	.list-shortcut-item{
		padding: 2px;
		line-height: 1;
		color:#fff;	
		font-size: 12px;		
	}
	.current{
		color:yellow;
	}
	.list-fixed{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
	.fixed-title{
		height: 30px;
		line-height: 30px;
		padding-left: 20px;
		font-size: 18px;
		color:red;
		background: #fff;
	}
	.loading-container{
		position: absolute;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
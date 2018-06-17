<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>
<script type="text/javascript">
	import BScroll from 'better-scroll'

	export default{
		props:{
			// 把props写成了prop
			probeType:{
				type:Number,
				default:1
			},
			click:{
				type:Boolean,
				default:true
			},
			data:{
				type:[Array,Object],
				default:null
			},
			listenScroll:{
				type:Boolean,
				default:false
			},
			pullup:{
				type:Boolean,
				default:false
			}
			// 是否监听scroll事件
		},
		mounted(){
			setTimeout(()=>{
				this._initSCroll();
			},20)
		},
		methods:{
			_initSCroll(){
				if(!this.$refs.wrapper){
					return 
				}

				this.scroll=new BScroll(this.$refs.wrapper,{
					probeType:this.probeType,
					click:this.click,
				})
				// console.log(this.scroll);

				if(this.listenScroll){
					let _self=this
					this.scroll.on('scroll',(pos)=>{
						_self.$emit('scroll',pos);
					})
				}
				// 如果监听事件滚动，那么就向外传递一个pos坐标
				
			},
			enable(){
				this.scroll&&this.scroll.enable();
			},
			disable(){
				this.scroll&&this.scroll.disable();
			},
			refresh(){
				this.scroll&&this.scroll.refresh();
				console.log('ok2');
			},
			scrollTo(){
				this.scroll&&this.scrollTo.apply(this.scroll,arguments)
			},
			scrollToElement(){
				this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
			},


		},
		watch:{
			data(){
				setTimeout(()=>{
					this.refresh();
					// console.log('ok1');
				},20)
			}

		}
	}
</script>
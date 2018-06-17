<template>
<transition name="slide">
	<!-- <div class="singer-detail"> -->
	<!-- {{this.$route.params.id}} -->
	<!-- 可以收到路径参数 -->
	<MusicList :songs="songs" :title="title" :bgImg='bgImg'>
		
	</MusicList>
</transition>
</template>
<script type="text/javascript">
import {mapGetters} from 'vuex'
import MusicList from '@/components/music-list/MusicList'
	export default{
		// 取出state的数据
		data(){
			return {
				songs:[]
			}
		},
		computed:{
			...mapGetters([
				'singer',
				// 一个数组，可以map多个singer.
				]),
			bgImg(){
				return this.singer.picUrl;
			},
			title(){
				return this.singer.name;
			},
		},
		created(){
			// console.log(this.singer);
			this.id=this.singer.id;
			this._getSinger(this.id);
			// 所有都必须要使用this来调用方法
		},
		methods:{
			_getSinger(id){
				var url='api/artists?id='+id;
				var _self=this;
				this.$ajax.get(url).then((respon)=>{
					_self.songs=respon.data.hotSongs
					// console.log(_self.songs);
				})

			},
		},
		components:{
			MusicList,
		}
	}
</script>
<style>
	.singer-detail{
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: red;
	}
	.slide-enter-active, .slide-leave-active{
		transition:all 0.5s;
	}
	.slide-enter, .slide-leave-to{
		transform: translate3d(100%, 0, 0)
	}
</style>
<template>
	<transition name="slide">
		<MusicList :title="title"  :bgImg="bgImg" :songs="songs" :rank="rank">
			
		</MusicList>
	</transition>
</template>
<script type="text/javascript">
	import MusicList from '@/components/music-list/MusicList'
	import {mapGetters} from 'vuex'
	export default{
		data(){
			return {
				songs:[],
				rank:true,
				// 判断是否要添加扩展
			}
		},
		methods:{
			_setSongs(topList){
				this.songs=topList.tracks
			}
		},
		components:{
			MusicList,
		},
		computed:{
			...mapGetters(
				['topList']
				),
			title(){
				return this.topList.name
			},
			// songs(){
			// 	return this.topList.tracks
			// },
			bgImg(){
				return this.topList.tracks[0].album.blurPicUrl
			}

		},
		created(){
			// console.log(this.topList.tracks)
			this._setSongs(this.topList)
		}
	}
</script>
<style>
	.slide-enter-active, .slide-leave-active{
		 transition: all 0.3s ease
	}
  	.slide-enter, .slide-leave-to{
  		transform: translate3d(100%, 0, 0)
  	}
</style>
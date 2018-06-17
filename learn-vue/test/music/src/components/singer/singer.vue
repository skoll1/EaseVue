<template>
	<div class="singer" ref="singer">
		<listView :data="singers"  ref="list" @select="selectSinger"></listView>
		<router-view></router-view>
	</div>
</template>
<script type="text/javascript">
	import listView from '@/base/listView'
	import {mapMutations} from 'vuex'
	import {playlistMixin} from '@/common/js/mixScroll'
	export default{
		mixins:[playlistMixin],
		data(){
			return {
				singers:[],
				rightlist:['热','A','B','C','D','F','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
			}
		},
		created(){
			this._getSinger();

		},
		methods:{
			_getSinger(){
				this.$ajax.get('api/top/artists?offset=0&limit=5').then((response)=>{
					var singer=response.data.artists;
					// console.log(singer);

					var list={
						hot:{
							title:"热门",
							items:[]
						}
					};
					
					for(let i in this.rightlist){
						var item=this.rightlist[i];
						// console.log(item)
						list.hot.items.push({
							id:item,
							artists:singer	
							//以变量的形式输入 
						});
						

					}
					this.singers=list.hot.items;
					// console.log(this.singers);					
				})
			},
			selectSinger(item){
				// console.log(item);
				this.$router.push({
					path:`/singer/${item.id}`
					// 就是当里面有可变或不可变的字符串的时候需要这样写。
				})
				// 不使用router-link实现转场，而且那个就是简单的层覆盖，之前还以为是什么厉害的组件销毁之类的东西。

				// 在组件跳转的时候提交一个mutation.
				this.setSinger(item);
			},
			...mapMutations({
				setSinger:'SET_SINGER'
			}),
			handlePlaylist(playlist){
				const bottom=playlist.length>0?'60px':''
				this.$refs.singer.style.bottom=bottom
				this.$refs.list.refresh()
			}

		},
		components:{
			listView,
		}
	}
</script>
<style>
	.singer{
		position: fixed;
		top: 88px;
		bottom: 0;
		width: 100%;
	}
</style>
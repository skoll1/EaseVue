<template>
	<div class="search">
		<div class="srearch-box-wrapper">
			<searchbox @query="onQueryChange" ref="searchbox"></searchbox>
		</div>

		<div class="shortcut-wrapper" ref="shortcutWrapper">
			<scroll :data="QuerySuggest" class="shortcut" ref="shortcut">
				<div>
						<div class="hot-key" v-show="!query">
							<h3 class="title">热门搜索</h3>
							<ul class="search-ul">
								<li v-for="item in QuerySuggest" @click="addQuery(item)" class="search-item">
									<span>{{item}}</span>
								</li>
							</ul>
						</div>			
				</div>
				<div class="search-history">
					
				</div>
			</scroll>
		</div>
		<div class="search-result" v-show="query" ref="searchresult">
			<suggest ref="suggest" :query="query"></suggest>

			<router-view></router-view>
		</div>
	</div>
</template>
<script type="text/javascript">
    import searchbox from '@/base/search-box'
    import scroll from '@/base/scroll' 
    import suggest from '@/base/suggestlist'
	export default{
		data(){
			return {
				QuerySuggest:[],
				query:''
			}
		},
		components:{
			searchbox,
			scroll,
			suggest,
		},
		methods:{
			onQueryChange(query){
				this.query=query
			},
			addQuery(item){
				this.$refs.searchbox.setQuery(item);
				// 父组件通过$refs调用子组件定义的方法
			},
			_getQuertSuggest(){
				this.QuerySuggest=["Eminem","Taylor Swift","薛之谦","我想","单身情歌","赵雷","80000","春风吹","陈奕迅","全部都是你"]
			}
		},
		created(){
			this._getQuertSuggest();
			console.log(this.QuerySuggest)
		}
	}
</script>
<style>
	.search-box-wrapper{
		margin: 20px;
	}
	.shortcut-wrapper{
		position: fixed;
		top: 127px;
		bottom: 0;
		width: 100%;
	}
	.shortcur{
		height: 100%;
		overflow:hidden;
	}
	.hot-key{
		margin: 0 20px 20px 20px ;
	}
	.title{
		margin-bottom: 20px;
		color:rgba(78, 71, 71, 0.58);
		font-size: 16px;
	    text-align: left;
	    margin: 10px;
	}
	.search-ul{
		display: flex;
		list-style: none;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content:flex-start;	
	}
	/*.search-ul li:nth-child(1){
		color:#000;
		font-size:16px;
	}*/
	.search-item{
		/*flex:auto;*/
		margin-left: 10px;
		margin-top: 5px;
		color:rgba(78, 71, 71, 0.28);
		font-size: 13px;
		border-radius: 6px;
		background: rgba(244, 239, 239, 0.32);
		padding: 6px;
	}
</style>
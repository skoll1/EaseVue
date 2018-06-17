<template>
	<div class="search-box" >
		<div class="search-icon">
				<svg class="icon" aria-hidden="true">
				    <use xlink:href="#icon-soushuo"></use>
				</svg>
		</div>

		<input class="box" ref="query" v-model="query" :placeholder="placeholder">

		<div class="dismiss" @click="clear" v-show="query">
				<svg class="icon" aria-hidden="true">
				    <use xlink:href="#icon-quxiao"></use>
				</svg>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				query:''
			}
		},
		props:{
			placeholder:{
				type:String,
				default:'搜索音乐, 视频, 电台'
			}
		},
		methods:{
			clear(){
				this.query=""
			},
			setQuery(query){
				this.query=query
			}
		},
		watch:{
			query(newQuery){
				this.$emit('query',newQuery)
				// 只把值传出去
			}
		}
	}
</script>
<style>
	.search-box{
		display: flex;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		padding: 0 6px;
		height: 40px;
		background: rgba(3, 169, 244, 0.77);
	}
	.search-icon{
		width: 23px;
	    height: 40px;
	    font-size: 13px;
	    color: #070707;
	    text-align: center;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}
	.box{
		flex:1;
		margin: 0 5px;
		line-height: 18px;
		color:rgba(158, 158, 158, 0.43);;
		font-size: 13px;
		border-radius: 10px;
		border:none;
		height: 25px;
		text-indent: 10px;
	}
	input{
		outline: none;
		border:0;
		background: #fff;
		/*box-shadow: 0px 0px 10px 10px rgba(3, 169, 244, 0.77);*/
	}
	input::placeholder{
		　color:#999;
		  font-size:13px;
		  color:rgba(158, 158, 158, 0.43);
		  text-indent:10px;
	}
	input:focus{
		box-shadow:inset -2px 1px 4px 1px rgba(3, 169, 244, 0.77);
	}
	.dismiss{
		width: 23px;
	    height: 40px;
	    font-size: 13px;
	    color: #070707;
	    text-align: center;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}
</style>
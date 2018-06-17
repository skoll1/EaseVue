<template>
	<div class="tab">
		<router-link tag="div" class="tab-item" to="/recommend">
			<span class="tab-link">推荐</span>
		</router-link>

		<router-link tag="div" class="tab-item" to="/singer">
			<span class="tab-link">歌手</span>
		</router-link>

		<router-link tag="div" class="tab-item" to="/rank">
			<span class="tab-link">排行</span>
		</router-link>

		<router-link tag="div" class="tab-item" to="/search">
			<span class="tab-link">搜索</span>
		</router-link>
	</div>
</template>
<script type="text/javascript">
	export default{}
</script>
<style>
	.tab{
		display: flex;
		height: 44px;
		line-height: 44px;
		font-size: 14px;
		background-color: #C20C0C;
	}
	.tab-item{
		flex:1;
		text-align: center;
		color:#fff;
	}
	.tab .router-link-active{
		border-bottom: 2px solid #fff;
	}
</style>
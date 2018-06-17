<template>
	<div class="header">
		<div class="know">
			<svg class="icon" aria-hidden="true">
			    <use xlink:href="#icon-maikefeng"></use>
			</svg>
		</div>
		<div class="text">
			<h4>Music</h4>
		</div>
		<router-link tag="div" class="mine" to="/user">
			<svg class="icon" aria-hidden="true">
			    <use xlink:href="#icon-ttpodicon"></use>
			</svg>
		</router-link>
	</div>
</template>
<script type="text/javascript">
	export default{

	}
</script>
<style>
	.header{
		position: relative;
		height: 44px;
		display: flex;
		background-color:#242424;
		color:#fff;
		line-height: 40px;
		
	}
	.know{
		flex:1;
		text-align: left;
		position: relative;
		top: 5px;
		left: 5px;
	}
	.text{
		flex:1;
		text-align: center;
	}
	.mine{
		flex:1;
		text-align: right;
		position: relative;
		top: 5px;
		right:5px;
	}

</style>

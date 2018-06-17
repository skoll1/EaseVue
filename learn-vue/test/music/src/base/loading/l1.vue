<template>
	<div class="loader">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</template>
<style>
	.loader{
		display: flex;
		/*height: 200px;*/
		margin: 0 auto;
		width:50%;
		align-items: center;
		justify-content: center;
		background: #ed5565;
	}
	.loader>div{
		width: 25px;
		height: 25px;
		border-radius: 100%;
		background: #fff;
		display: inline-block;
		float: left;
	}
	@keyframes scale{
		0%{
			transform: scale(1);
			opacity: 1;
		}
		45%{
			transform: scale(0.1);
			opacity: 0.5;
			background: yellow;
		}
		100%{
			transform:scale(1);
			opacity: 1;
		}
	}
	.loader>div:nth-child(1){
		animation: scale 0.75s 0s infinite ease;
	}
	.loader>div:nth-child(2){
		animation: scale 0.75s 0.12s infinite ease;
	}
	.loader>div:nth-child(3){
		animation: scale 0.75s 0.24s infinite ease;
	}
	.loader>div:nth-child(4){
		animation: scale 0.75s 0.36s infinite ease;
	}
	.loader>div:nth-child(5){
		animation: scale 0.75s 0.48s infinite ease;
	}

</style>
<script type="text/javascript">
	
</script>
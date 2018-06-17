<template>
	<div class="loading-box">
		<div class="line"></div>
		<div class="line"></div>
		<div class="line"></div>
	</div>
</template>
<style>
	.loading-box{
		width: 100px;
		height: 100px;
		border:1px solid red;
		background-color: #fff;
		text-align: center;
		border-radius: 5px;
	}
	.line{
		display: inline-block;
		width: 15px;
		height: 15px;
		border-radius: 15px;
		background-color: #4b9cdb;
	}

	@keyframes loading{
		0%{
			width: 15px;
		}
		50%{
			width: 35px;
		}
		100%{
			width: 15px;
		}
	}
	.line:nth-child(1){
		animation: loading 1.5s 1s infinite
	}
	.line:nth-child(2){
		animation: loading 1.5s .5s infinite
	}
	.line:nth-child(3){
		animation: loading 1.5s 0s infinite
	}
</style>
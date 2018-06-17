<template>
	<div class="ball-pulse-rise loading-box">
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
		border:7px dashed #fff;
		animation: loading 1.5s .3s cubic-bezier(.17,.37,.43,.67) infinite;
	}

	@keyframes loading{
		0%{
			transform: translate(0,0)
		}
		50%{
			transform:translate(0,15px);
		}
		100%{
			transform: translate(0,0);
		}
	}
</style>
<template>
	<div class="ball-clip-rotate loading-box">
		<div>
			
		</div>
	</div>
</template>
<style>
	.loading-box{
		width: 100px;
		height: 100px;
		border:1px solid red;
		background-color: #ed5565;
	}
	@keyframes rotate{
		0%{
			transform:rotate(0deg) scale(1);
		}
		50%{
			transform: rotate(180deg) scale(0.6);
		}
		100%{
			transform: rotate(360deg) scale(1)
		}
	}
	.ball-clip-rotate>div{
		background: transparent;
		width: 25px;
		height: 25px;
		border-radius: 100%;
		margin: 2px;
		animation-fill-mode: both;
		border:2px solid #fff;
		border-bottom-color: transparent;
		display: inline-block;
		animation: rotate 0.75s 0s linear infinite;

	}
</style>
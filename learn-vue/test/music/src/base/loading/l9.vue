<template>
	<div class="square-spin loading-box">
			<div></div>
	</div>
</template>
<style>
	.loading-box{
		width: 100px;
		height: 100px;
		border:1px solid red;
		background-color: #ed5565;
	}
	.square-spin>div{
		animation-fill-mode: both;
		width: 50px;
		height: 50px;
		background: #fff;
		border:1px solid red;
		animation: square-spin 3s 0s cubic-bezier(.09, .57, .49, .9) infinite; 
	}

	@keyframes square-spin{
		25%{
			transform: perspective(100px) rotateX(180deg) rotateY(0);
		}
		50%{
			transform: perspective(100px) rotateX(180deg) rotateY(180deg);
		}
		75%{
			transform: perspective(100px) rotateX(0) rotateY(180deg);
		}
		100%{
			transform: perspective(100px) rotateX(0) rotateY(0);
		}
	}
</style>
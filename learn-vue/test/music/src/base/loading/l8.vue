<template>
	<div class="ball-clip-rotate-pulse loading-box">
			<div></div>
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
	.ball-clip-rotate-pulse{
		position: relative;
		transform:translateY(-15px);	
	}
	.ball-clip-rotate-pulse >div{
		position: absolute;
		top: 0;
		left: 0;
		border-radius: 100%;
		animation-fill-mode: both; 
	}
	.ball-clip-rotate-pulse >div:first-child{
		background: #fff;
		height: 16px;
		width: 16px;
		top: 9px;
		left: 9px;
		animation: scale 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
	}
	.ball-clip-rotate-pulse >div:last-child{
		position: absolute;
		border:2px solid #fff;
		width: 30px;
		height: 30px;
		background: transparent;
		border-color:#fff transparent #fff transparent;
		animation: rotate 1s 0s cubic-bezier(.09, .57, .49, .9) infinite;
		animation-duration: 1s;
	}
	@keyframes rotate {
		  0% {
		    -webkit-transform: rotate(0deg) scale(1);
		            transform: rotate(0deg) scale(1); }

		  50% {
		    -webkit-transform: rotate(180deg) scale(0.6);
		            transform: rotate(180deg) scale(0.6); 
		      }

		  100% {
		    -webkit-transform: rotate(360deg) scale(1);
		            transform: rotate(360deg) scale(1); 
		        } 
		   }
	@keyframes scale{
		0%{
			transform:scale(1);
			opacity: 1;
		}
		50%{
			transform:scale(0.6);
			opacity: 0.6
		}
		100%{
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
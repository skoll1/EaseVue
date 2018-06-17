<template>
	<div class="ball-pulse-rise loading-box">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<!-- <div></div> -->
	</div>
</template>
<style>
/*别的都一样，但是他们的动画函数名字不一样，就需要简写形式*/
	.loading-box{
		width: 100px;
		height: 100px;
		border:1px solid red;
		background-color: #ed5565;
	}
	.ball-pulse-rise>div{
		background: #fff;
		width: 15px;
		height: 15px;
		border-radius: 100%;
		margin: 2px;
		animation-fill-mode: both;
		display: inline-block;
		animation-duration: 1s;
		animation-timing-function: cubic-bezier(.15,.46,.9,.6);
		animation-iteration-count: infinite;
		animation-delay: 0;  
	}
	.ball-pulse-rise>div:nth-child(2n){
		animation-name: ball-pulse-rise-even;
	}
	.ball-pulse-rise > div:nth-child(2n-1){
		animation-name:ball-pulse-rise-odd; 
	}
	@keyframes ball-pulse-rise-odd{
		0%{
			transform: scale(0.4);
		}
		25%{
			transform:translateY(30px);
		}
		50%{
			transform:scale(1.1);
		}
		75%{
			transform: translateY(-30px);
		}
		100%{
			transform:translateY(0);
			transform: scale(0.75)
		}
	}

	@keyframes ball-pulse-rise-even{
		0%{
			transform:scale(1.1);
		}
		25%{
			transform: translateY(-30px);
		}
		50%{
			transform:scale(0.4);
		}
		74%{
			transform:translateY(30px);
		}
		100%{
			transform: translateY(0);
			transform:scale(1);
		}
	}
</style>
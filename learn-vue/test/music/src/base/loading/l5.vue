<template>
	<div class="cube-transition">
		<div></div>
		<div></div>
	</div>
</template>
<style>
	.cube-transition{
		position: relative;
	    background: #ed5565;
	    width: 100px;
	    height: 100px;
	}
	.cube-transition>div{
		animation-fill-mode: both;
		width: 20px;
		height: 20px;
		position: absolute;
		top: 0;
		left: 0;
		background: #fff;
		animation: cube-transition 1.6s 0s infinite ease-in-out;
	}
	.cube-transition>div:last-child{
		animation-delay: -0.8s;
	}
	@keyframes cube-transition{
		25%{
			transform: translateX(50px) scale(0.5) rotate(-90deg);
			border-radius: 50%
		}
		50%{
			transform: translate(50px,50px) rotate(-180deg);
			border-radius: 100%;
		}
		75%{
			transform: translateY(50px) scale(0.5) rotate(-270deg);
		}
		100%{
			transform: rotate(-360deg);

		}
	}
</style>
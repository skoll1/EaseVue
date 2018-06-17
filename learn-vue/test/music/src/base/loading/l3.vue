<template>
	<div class="loader">
		<div></div>
		<div></div>
		<div></div>
	</div>
</template>
<style>
	@keyframes sync{
		33%{
			transform: translateY(10px);
		}
		66%{
			transform: translateY(-10px;);
		}
		100%{
			transform: translateY(0)
		}
	}
	.loader{

	}
	.loader >div{
		background: #fff;
		width: 15px;
		height: 15px;
		border-radius: 100%;
		display: block;
		float: left;
		margin-left: 5px;
		animation-fill-mode: backwards;
		/*让动画回到第一帧*/

		/*both:根据animation-direction和forwards和bancdkongzhi */
		/*让动画保持在结束状态*/
	}
	.loader>div:nth-child(1){
		animation: sync 0.6s 0s infinite ease;
	}
	.loader>div:nth-child(2){
		animation: sync 0.6s 0.07s infinite ease;
	}
	.loader>div:nth-child(3){
		animation: sync 0.6s 0.14s infinite ease;
	}
	.loader>div:nth-child(4){
		animation: sync 0.6s 0.21s infinite ease;
	}
</style>
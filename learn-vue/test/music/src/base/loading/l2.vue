<template>
	<div class="loader">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</template>
<style>
	.loader{
		/*display: flex;*/
		/*height: 200px;*/
		margin: 0 auto;
		background: #ed5565;
		width: 57px;
		height: 57px;
		/*float: left;*/

	}
	.loader div{
		background: #fff;
		width: 15px;
		height: 15px;
		border-radius: 100%;
		float: left;

	}
	@keyframes grid{
		0%{
			transition: scale(1);
			opacity: 1;
		}
		50%{
			transition: scale(.5);
			opacity: 0.1
		}
		100%{
			transform: scale(1);
			opacity: 1
		}
	}
	.loader>div:nth-child(1){
		animation: grid 0.75s -0.06s infinite ease;
	}
	.loader>div:nth-child(2){
		animation: grid 1.02s 0.25s infinite ease;
	}
	.loader>div:nth-child(3){
		animation: grid 1.28s -0.17s infinite ease;
	}
	.loader>div:nth-child(4){
		animation: grid 1.42s 0.48s infinite ease;
	}
	.loader>div:nth-child(5){
		animation: grid 1.45s 0.31s infinite ease;
	}
	.loader>div:nth-child(6){
		animation: grid 1.18s 0.03s infinite ease;
	}
	.loader>div:nth-child(7){
		animation: grid 0.87s 0.46s infinite ease;
	}
	.loader>div:nth-child(8){
		animation: grid 1.45s -0.06s infinite ease;
	}
	.loader>div:nth-child(9){
		animation: grid 1.06s -0.06s infinite ease;
	}
</style>
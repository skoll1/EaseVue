<template>
	<div class="ball-pulse-rise loading-box">
		<div class="line">
				<div class="buble-1">
					
				</div>
				<div class="buble-2">
					
				</div>
		</div>
		
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
		position: relative;
		width: 45px;
		height: 45px;
		margin: 0 auto;
		border-radius: 100%;
		background-color: #4b9cdb;
		animation: loadingA 2s linear infinite;
	}
	.buble-1,.buble-2{
		position: absolute;
		top: 0;
		width: 25px;
		height: 25px;
		border-radius: 100%;
		background-color: #fff;
		animation: loadingT 2s ease-in-out infinite;
	}
	.buble-2{
		top: auto;
		bottom: 0;
		animation-delay: -0.1s: 
	}
	@keyframes loadingA{
		
		100%{
			transform:rotate(360deg);
		}
	}
	
	@keyframes loadingT{
		0%,100%{
			transform:scale(0.0);
		}
		50%{
			transform:scale(1.0);
		}
	}
</style>
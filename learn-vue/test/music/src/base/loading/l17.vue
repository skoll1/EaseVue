<template>
	<div class="ball-pulse-rise loading-box">
		<div class="line">
				<div class="square">
					
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
	}
	.square{
		width: 12px;
		height: 12px;
		border-radius: 4px;
		background-color: #4b9cdb;
		animation:loading 1.5s cubic-bezier(.17,.37,.43,.67) infinite;
	}
	@keyframes loading{
		0%{
			transform:translate(0,0) rotate(0deg);
		}
		50%{
			transform:translate(70px,0) rotate(360deg);
		}
		100%{
			transform:translate(0,0) rotate(0deg);
		}
	}

</style>
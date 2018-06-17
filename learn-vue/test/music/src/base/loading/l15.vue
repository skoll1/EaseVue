<template>
	<div class="ball-pulse-rise loading-box">
		<div class="line">
			<div class="ballholder">
				<div class="ball">
					
				</div>
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
	.ballholder{
		position: absolute;
		height: 45px;
		width: 12px;
		left: 17px;
		top: 0;
		animation: loading 1.3s linear infinite;
	}
	.ball{
		position: absolute;
		top: -11px;
		left: 0;
		width: 16px;
		height: 16px;
		border-radius: 100%;
		background-color: red;

	}

	@keyframes loading{
		0%{
			transform:rotate(0deg);
		}
		50%{
			transform:rotate(180deg);
		}
		100%{
			transform:rotate(360deg);
		}
	}

</style>
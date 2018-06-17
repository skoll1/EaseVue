<template>
	<div class="ball-pulse-rise loading-box">
		<div class="line">
			<div class="letter l-1">L</div>
			<div class="letter l-2">O</div>
			<div class="letter l-3">A</div>
			<div class="letter l-4">D</div>
			<div class="letter l-5">I</div>
			<div class="letter l-6">N</div>
			<div class="letter l-7">g</div>
			<div class="letter l-8">.</div>
			<div class="letter l-9">.</div>
			<div class="letter l-10">.</div>
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
	.letter{
		float:left;
		font-size: 14px;
		color:#777;
		animation-name:loading;
		animation-duration:1.6s; 
		animation-iteration-count:infinite;
		animation-direction:linear;  
	}
	.l-1{
		animation-delay: .48s;
	}
	.l-2{
		animation-delay: .6s;
	}
	.l-3{
		animation-delay: .72s;
	}
	.l-4{
		animation-delay: .84s;
	}
	.l-5{
		animation-delay: .96s;
	}
	.l-6{
		animation-delay: 1.08s;
	}
	.l-7{
		animation-delay: 1.2s;
	}
	.l-8{
		animation-delay: 1.32s;
	}
	.l-9{
		animation-delay: 1.44s;
	}
	.l-10{
		animation-delay: 1.56s;
	}

	
	@keyframes loading{
		0%{
			opacity:0;
		}
		100%{
			opacity:1;
		}
	}

</style>
<template>
	<div class="spin-rotate-wrapper">
		<div></div>
	</div>
</template>
<style>
.spin-rotate-wrapper{
	position: relative;
	width: 35px;
	height: 35px;
	overflow: hidden;
	background: #ed5565;
}
.spin-rotate-wrapper>div{
	position: absolute;
	border: 0px;
	border-radius:100%;
	width: 100%;
	height: 100%;
	animation: spin-rotate 0.5s 0s infinite linear;
	background-image: linear-gradient(transparent 0%, transparent 70%, #fff 30%, #fff 100%);
}
	@keyframes spin-rotate{
		0%{
			transform:rotate(0deg);
			opacity: 1
		}
		50%{
			transform:rotate(180deg);
			opacity: .5
		}
		100%{
			transform: rotate(360deg);
			opacity: 1
		}
	}
</style>
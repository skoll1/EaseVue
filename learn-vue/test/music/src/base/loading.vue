<template>
	<div class="loading">
		<!-- <img src="./loading.gif" alt="图片到时候找吧" width="24" height="24" > -->
		<p class="desc">{{title}}</p>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:{
			title:{
				type:String,
				default:"正在载入。。。"
			}
		}
	}
	// 使用export default导出这个变量，使得外部可以获取，来webpack编译打包。
	// export输出变量，函数，类。不仅要在这个里面看，还要在别的里面看。
</script>
<style>
	.loading{
		width: 100%;
		text-align: center;		
	}
	.desc{
		line-height: 20px;
		font-size: 15px;
		color:red;
	}
</style>
<template>
		<div class="song-list">
			<ul>
				<li v-for="(item,index) in songs" 
					class="song-list-item" 
					@click="selectItem(item,index)">
					<div class="songRank" v-show="rank">
							<div class="songRankShow" v-if="index==0">
									<svg class="icon" aria-hidden="true">
									    <use xlink:href="#icon-first"></use>
									</svg>
							</div>
							<div class="songRankShow" v-else-if="index==1">
									<svg class="icon" aria-hidden="true">
									    <use xlink:href="#icon-dierming"></use>
									</svg>
							</div>
							<div class="songRankShow" v-else-if="index==2">
									<svg class="icon" aria-hidden="true">
									    <use xlink:href="#icon-third"></use>
									</svg>
							</div>
							<div class="songRankText songRankShow" v-else>
									{{index}}
							</div>
					</div>
					<div class="content">
						<!-- <h2 class="name">{{item.name}}</h2> -->
						<p class="desc">{{item.name}}</p>
					</div>
				</li>
			</ul>
		</div>
</template>
<script type="text/javascript">
	export default{
		props:{
			songs:{
				type:Array,
				default:[]
			},
			rank:{
				type:Boolean,
				default:false
			}

		},
		methods:{
			getDesc(item){
				return `${item.al.name}`
			},
			selectItem(item,index){
				// console.log(item);
				this.$emit('select',item,index)
			}
		}
	}
</script>
<style>
	.song-list-item{
		display: flex;
		align-items: center;
		box-sizing: border-box;
		height: 64px;
		font-size: 15px;
	}
	.rank{
		flex:0 0 25px;
		width: 25px;
		margin-right: 30px;
		text-align: center;
	}
	.icon{
		display:inline-block;
		width: 25px;height: 24px;
		background-size: 25 24px;
	}
	.text{
		color:yellow;
		font-size: 16px;
	}
	.cotent{
		flex:1;
		line-height: 20px;
		overflow: hidden;
	}
	.name{
		color:#9e9e9e;
		word-wrap: normal;
	}
	.desc{
		margin-top: 4px;
		color:#433131;
	}
	.songRankShow{
		width: 40px;
		position: relative;
		top: 4px;
	}
	.songRankText{
		padding-left: 5px;
		color:red;
		font-size: 20px;
	}
</style>
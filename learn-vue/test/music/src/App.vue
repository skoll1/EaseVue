<template>
        <div>
                 <mHeader></mHeader>
                 <tab></tab>
                 <keep-alive>
                    <router-view></router-view>
                 </keep-alive>
                 <player></player>
                 <!-- 跟路由没关系，所有的页面都是可以播出的,切换路由是不影响播放的 -->
                 <!-- 组件按需加载 -->
        </div>
</template>
<script>

import mHeader from '@/components/m-header/header';
import tab from '@/components/tap/tap';
import player from '@/components/player/player'

export default {
  name: 'app',
  components:{
    mHeader,
    tab,
    player,
  }
}
</script>

<style>

</style>

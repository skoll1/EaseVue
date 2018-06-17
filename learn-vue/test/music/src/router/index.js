import Vue from 'vue';
import Router from 'vue-router';


import rank from '@/components/rank/rank';
import recommend from '@/components/recommend/recommend';
import singer from '@/components/singer/singer';
import search from '@/components/search/search';
import user from '@/components/user/user';
import singerDetail from '@/components/singer-detail/singerDetail'
import dist from '@/components/dist/dist'
import topList from '@/components/topList/toplist'

Vue.use(Router);

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect:'/recommend'
    },
    {
      path:"/recommend",
      component:recommend,
      children:[
        {
          path:':id',
          component:dist
        }

      ]
    },
    {
      path:'/singer',
      component:singer,
      children:[
          {
            path:':id',
            component:singerDetail
          }
        ]
    },
    {
      path:"/rank",
      component:rank,
      children:[
        {
          path:':id',
          component:topList
        }

      ]
    },
    {
      path:'/search',
      component:search,
    },
    {
      path:'/user',
      component:user
    }

  ]
})

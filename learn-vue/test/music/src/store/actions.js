// 异步操作
import * as types from './mutation-types'
import {playMode} from '@/common/js/config'
// 这个里面也是要用到的

import {shuff} from '@/common/js/utis'

function findIndex(list,song){
  return list.findIndex((item)=>{
    return list.id=song.id
  })
}

// 一步包装许多操作，很多的初始化
export const selectPlay=function({commit,state},{list,index}){
  commit(types.SET_SEQUENCE_LIST,list)
  // 1
  if(state.mode===2){
    // 好像就从来没取到过那个语义化数值
    console.log('mode')

    let randomList=shuff(list)
    commit(types.SET_PLAYLIST,randomList)
    index=findIndex(randomList,list[index])
  }else{
    commit(types.SET_PLAYLIST,list)
  }
  
  commit(types.SET_CURRENT_INDEX,index)
  // 3
  commit(types.SET_FULL_SCREEN,true)
  // 4
  commit(types.SET_PLAYING_STATE,true)
  // 5
}

export const randomPlay=function({commit},{list}){
  commit(types.SET_PLAY_MODE,playMode.random)
  // +1

  commit(types.SET_SEQUENCE_LIST,list)
  // 1
  let randomList=shuff(list)
  
  // 这个顺序反了
  // 遇到错误就要从他的开头开始捋.
  commit(types.SET_PLAYLIST,randomList)

  commit(types.SET_FULL_SCREEN,true)
  // 4
  commit(types.SET_PLAYING_STATE,true)
  // 5
  commit(types.SET_CURRENT_INDEX,0)
  // 3
}


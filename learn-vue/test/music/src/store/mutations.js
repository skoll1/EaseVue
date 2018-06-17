// 数据提交
import * as types from './mutation-types'


const mutations={
  [types.SET_SINGER](state,singer){
    // 原始数据，提交数据
    state.singer=singer
  },
  [types.SET_PLAYING_STATE](state,flag){
    state.playing=flag
  },
  [types.SET_FULL_SCREEN](state,flag){
    state.fullScreen=flag
  },
  [types.SET_PLAYLIST](state,list){
    state.playlist=list
  },
  [types.SET_SEQUENCE_LIST](state,list){
    state.sequenceList=list
  },
  [types.SET_PLAY_MODE](state,mode){
    state.mode=mode
  },
  [types.SET_CURRENT_INDEX](state,index){
    state.currentIndex=index
  },
  [types.SET_DIST](state,dist){
    state.dist=dist
  },
  [types.SET_TOPLIST](state,topList){
    state.topList=topList
  }

}

export default mutations
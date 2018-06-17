// 存放数据的地方
import {playMode} from '@/common/js/config' 
const state={
  singer:{},
  playing:false,
  fullScreen:false,
  playlist:[],
  sequenceList:[],
  mode:playMode.sequence,
  currentIndex:-1,

  dist:{},
  topList:{},
  // 歌单的数据
}
export default state
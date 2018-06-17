// 提交类型名字,使用常量代替mutations事件类型在各种flux中实现是很常见的情况，这样可以用linter工具进行diamante检查，而且把他单独的放在一个文件夹中可以让你的代码合作者对整个app包含的mutation一目了然。

export const SET_SINGER = 'SET_SINGER'

export const SET_PLAYING_STATE = 'SET_PLAYING_STATE'

export const SET_FULL_SCREEN ='SET_FULL_SCREEN'

export const SET_PLAYLIST= 'SET_PLAYLIST'

export const SET_SEQUENCE_LIST='SET_SEQUENCE_LIST'

export const SET_PLAY_MODE='SET_PLAY_MODE'

export const SET_CURRENT_INDEX='SET_CURRENT_INDEX'

export const SET_DIST="SET_DIST"

export const SET_TOPLIST="SET_TOPLIST"

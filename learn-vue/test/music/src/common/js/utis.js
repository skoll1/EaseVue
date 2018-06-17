function getRandom(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
export function shuff(list){
  let _list=list.slice()
  // 这下是对了，但是为什么每次随机的第一歌不变呢？都是第一首歌。
  for(let i=0;i<list.length;i++){
      let j=getRandom(0,i);
      
      _list[i,j]=_list[j,i];   
  }
  return _list;
}
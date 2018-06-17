// 实现初始化设置和数据监测
function Vue(options){
	console.log('Vue start!')
	// console.log(this)
	// 初始的this--一个空对象;

	// 取到数据
	this.$options=options||{
		data:'hello VueJs!'
	}
	// 添加默认设置

	var data=this._data=this.$options.data;
	var me=this;

	// 数据代理，可以在外部修改数据
	// for(let key of Object.keys(data)){
	// 	me._proxyData(key);
	// }
	Object.keys(data).forEach(function(key){
		me._proxyData(key);
	})

	observer(data,this);
	// 数据观测，set方法定义。
	// get方法在下面用到


	// 编译模板
	this.$compile=new Compile(options.el||document.body,this);
	// 传到这个里面的this--挂载了以上的全部方法;
	// console.log(this)
}

Vue.prototype={
	_proxyData:function(key,setter,getter){
		var me=this;
		console.log(key)
		Object.defineProperty(me,key,{
			configurable:false,
			enumerable:true,
			get:function proxyGet(){
				return me._data[key];
			},
			set:function proxySet(newV){
				// if(me._data[key]==newV){
				// 	console.log('一样')
				// 	return;
				// }
				me._data[key]=newV;
				// console.log('changeok');
				console.log(me._data[key])
			}

		});
	},
}
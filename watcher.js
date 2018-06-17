// 观察者，联系complice和observe
function Watcher(vm,expOrFn,cd){
	this.cb=cd;
	this.vm=vm;
	this.expOrFn=expOrFn;
	this.value=this.get();
	// console.log(this.value);
	// 将自己添加到订阅器里面的操作

}
Watcher.prototype={
	get:function(){
		Dep.target=this;
		// console.log(Dep.target)
		// console.log(this.expOrFn)
		var value=this.vm._data[this.expOrFn];
		// console.log(this.vm._data[this.expOrFn])
		Dep.target=null;
		return value;
	},
	update:function(){
		this.run();
	},
	run:function(){
		var value=this.get();
		var oldVal=this.value;
		console.log(value);
		console.log(oldVal);
		if(value !== oldVal){
			this.value=value;
			this.cb.call(this.vm,value,oldVal);
		}
	},
	addDep:function(dep){
		// 每次调用run的时候都会触发相应属性的getter
	}
}
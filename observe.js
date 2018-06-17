// 劫持监听所有的属性

function Observer(data){
	this.data=data;
	// console.log(this.data);
	this.walk(data)
}

Observer.prototype={
	walk:function(data){
		var me=this;
		Object.keys(data).forEach(function(key){
			me.covert(key,data[key]);
		})
	},
	covert:function(key,val){
		// console.log(key,val)
		this.defineReactive(this.data,key,val);
	},

	defineReactive:function(data,key,val){
		var dep=new Dep();

		var childObj=observer(val)
		// 监听他的子数据
		console.log(val)

		Object.defineProperty(data,key,{
			enumerable:true,
			configurable:true,
			get:function(){
				if(Dep.target){
					console.log(Dep.target)
					dep.addSub(Dep.target);
					// console.log('ok');
					// console.log(dep.subs)

				}
				return val;
			},
			set:function(newV){
				if(newV===val){
					return ;
				}

				// var val=newV;
				// 自己又重新定义了。同名但是不同作用域所以没有提交更新。
				val=newV;
				childObj=observer(newV);
				dep.notify();
			}
		})
	}
}


var uid=0;
function Dep(){
	this.id=uid++;
	this.subs=[];
	// 来一个放置订阅他的元素的数组
}

Dep.prototype={
	addSub:function(sub){
		this.subs.push(sub);
	},
	depend:function(){
		Dep.target.addDep(this);
	},
	removeSub:function(sub){
		var index=this.subs.indexOf(sub);
		if(index !=-1){
			this.subs.splice(index,1);
		}
	},
	notify:function(){
		this.subs.forEach((key)=>{
			key.update();
		})

		// console.log(this.subs);
	}
}
Dep.target=null;


function observer(value,vm){
	if(!value || typeof value !=='object'){
		return ;
	}

	return new Observer(value);
}
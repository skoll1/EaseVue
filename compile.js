// 编译模板
function Compile(el,vm){
	console.log('Compile start!');
	this.$vm=vm;
	this.$el=this.isElementNode(el)?el:document.querySelector(el);

	// 拆分大的dom
	if(this.$el){
		this.$fragment=this.node2Fragment(this.$el);

		this.init()
		// 编译模板的主函数
		this.$el.appendChild(this.$fragment)
		// 编译成功在一次性装回去
	}
}

Compile.prototype={
	node2Fragment:function(el){
		var fragment=document.createDocumentFragment();
		var child;

		// 将原生节点拷贝到这个里面,在一个独立的空间里面操作，和外面没关系。
		while(child=el.firstChild){
			fragment.appendChild(child);
		}
		return fragment;
	},
	isElementNode:function(node){
		return node.nodeType==1;
	},	
	isTextNode(node){
		return node.nodeType==3
	},
	isDirective(attr){
		return attr.indexOf('v-')==0;
	},
	isEventDirective(dir){
		return dir.indexOf('on')===0;
	},
	isBindDirect(dir){
		return dir.indexOf('bind')==0;
	},
	init:function(){
		this.compileElement(this.$fragment);
	},
	compileElement:function(el){
		var childNodes=el.childNodes;
		// 这个是拿到要操作的

		var me=this;
		[...childNodes].forEach((node)=>{
			var text=node.textContent;
			// console.log(text)
			var reg=/\{\{(.*)\}\}/;
			// {{}}正则匹配

			if(me.isElementNode(node)){
				// 编译元素文档
				me.compile(node)
			}else if(me.isTextNode(node)&&reg.test(text)){ 
				// 如果是文本节点的话，并且是{{}}形式,index1就是走这一步
				me.compileText(node,RegExp.$1)
				// $1:第一个正则括号里面匹配到的东西

			}

			if(node.childNodes &&node.childNodes.length){
				me.compileElement(node);
				// 如果有子元素的话就再次进行编译
				// console.log('son')
			}
		});
	},
	compile:function(node){
		// console.log(node);

		var nodeAttrs=node.attributes;
		// 找到这个元素的所有属性
		var me=this;
		[].slice.call(nodeAttrs).forEach((attr)=>{
			// console.log(attr)
			var attrName=attr.name;
			// 找到这个属性的name;
			// console.log(attrName)
			if(me.isDirective(attrName)){
				var exp=attr.value;
				// 指令的值
				// console.log(exp)

				var dir=attr.name.substring(2);
				// 找到指令
				// console.log(dir)

				if(me.isEventDirective(dir)){
					// 如果是事件指令的话
				}else if(me.isBindDirect(dir)){
					compileUtil.bindUpdater(node,me.$vm,exp,dir);
					// v-bind:指令
					new Watcher(me.$vm,exp,function(value,oldValue){
						compileUtil.bindUpdater(node,me.$vm,exp,dir);
					})
				}else{
					compileUtil[dir]&&compileUtil[dir](node,me.$vm,exp);
					// v-text,if,class,htnl之类的指令
					// 具有代码复用性，所以按照分类进行选择
				}
			}
			node.removeAttribute(attrName);

		})
	},
	compileText:function(node,exp){
		compileUtil.text(node,this.$vm,exp);
	}

};

// 所有指令集合
var compileUtil={
	text:function(node,vm,exp){
		this.bind(node,vm,exp,'text');
	},
	html:function(node,vm,exp){
		this.bind(node,vm,exp,'html');
	},
	if:function(node,vm,exp){
		this.bind(node,vm,exp,'if');
		// v-if
	},
	show:function(node,vm,exp){
		this.bind(node,vm,exp,'show');
		// v-show
	},
	bind:function(node,vm,exp,dir){
		var updaterFn=updater[dir+'Updater']
		// 通过指令更新调取函数的特定方法
		// console.log(node);
		// console.log(vm);
		// 整个Vue对象;
		// console.log(exp);
		// console.log(dir)
		// 指令只是用来找到函数方法


		updaterFn&&updaterFn(node,this._getVMVal(vm,exp));
		// console.log(this._getVMVal(vm,exp))
		// 使用函数更新页面,他的参数是Vue对象和更新的值

		// 监听数据、绑定更新函数的处理是在compileUtil.bind()这个方法中,通过new Watcher()添加回调来接收数据变化的通知
		// 也就说所有的需要实现数据绑定的都必须在触发这个wacher()。
		new Watcher(vm,exp,function(value,oldValue){
			updaterFn&&updaterFn(node,value,oldValue);
			// 会多传一个参数
			// console.log(value,oldValue);
		})
	},
	_getVMVal:function(vm,exp){
		var val=vm;
		exp=exp.split('.');
		// 把指令变成数组来查询。
		// console.log(exp)
		exp.forEach((k)=>{
			val=val[k];
		});
		return val;
	},
	bindUpdater:function(node,vm,exp,dir){

		node.setAttribute(exp,this._getVMVal(vm,exp));
	}
}

// 更新函数在这里

var updater={
	textUpdater:function(node,value){
		node.textContent=typeof value=='undefined'?'':value;	
	},
	htmlUpdater:function(node,value){
		node.innerHTML=typeof value=='undefined'?'':value;
	},
	ifUpdater:function(node,value){
		node.parentNode.removeChild(node);
	},
	showUpdater:function(node,value){
		if(value){
			return;
		}else{
			node.style.display="none";
		}
	}
}
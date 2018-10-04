// 判断是不是根节点,并且有子节点
function isRoot(el){
    // console.log(el.children)
    return el.hasAttribute('id') && el.children
}

function addRoot(el){
    let oldattrs=getAttributes(el)
    // 这个里面就先不判断了吧，默认他只有一个id属性
    oldattrs.childs=[]
    oldattrs.isRoot=true
    return oldattrs
}

function addChild(el){
    // let childs=el.children
    // 竟然是个object

    // let childs=Array.from(el.children)
    // 转完竟然还是object,还不能使用[...]来简化调用

    // Object.
    // console.log(typeof childs)
    // console.log(childs[0])

    // for(let i=0;i<childs.length;i++){
    //     // console.log(childs[i])
    //     let node=childs[1]
    //     console.log(node)
    //     let attrs=getAttributes(node)
    //     console.log(attrs)
        
    // }
    return el.children 
}

function changeChild(arr){
    let re=[]
    for(let i=0;i<arr.length;i++){
        

        // console.log(arr[i])
        let attrs=getAttributes(arr[i])
        let {vif,vfor,vshow,id}=chooseAttr(attrs,data)
        // console.log(attrs)
        let nodeName=arr[i].nodeName.toLowerCase()
        let childs=arr[i].children
        // console.log(childs)
        let node=new Node(nodeName,vif,vfor,childs,id)
        re.push(node)
    }
    return re
}
// 把htmlcollection对象转为数组对象

function addAttr(el){
    let attrs=getAttributes(el)
    return attrs
}

let vnode_count=0
function chooseAttr(obj,data){
    // 查看data对象里面是否有定义的数据
    let chooseAttrs=['v-if','v-show','v-for']
    // 因为大部分都是这么几个，所以直接使用很简单的取值就可以了
    let result={}
    chooseAttrs.map((e,i)=>{
        
        if(e=='v-show'&&obj[e]!==undefined||e=='v-if'&&obj[e]!==undefined){
            console.log('v-if')
            // 检查是否有对应的值，然后检查是否可以转换为布尔值，如果不可以，返回false
            let key=obj[e]
            if(getValueType(data[key])=='boolean'){
                result.vif=Boolean(data[key])
                result.id=Node.count
                Node.count++
            }else{
                console.log(Boolean(data[key]))
                console.log('这个值不是一个布尔值')
            }

        }else if(e=='v-for'&&obj[e]!==undefined){
            console.log('v-for')
        }
    })
    return result;

}

function getAttributes(el){
    const attr=el.getAttributeNames()
    const elm=el.nodeName.toLowerCase()
    let attrs={}
    attr.map((e)=>{
        attrs[e]=el.getAttribute(e)
    })
    attrs.nodeName=elm
    return attrs
}

function index(el){
    if(isRoot(el)){
        let obj=addRoot(el);
        console.log(obj)
        obj.childs=changeChild(addChild(el))
        console.log(obj)
    }
}
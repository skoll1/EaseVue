// 判断是不是根节点,并且有子节点
function isRoot(el){
    // console.log(el.children)
    return el.hasAttribute('id') && el.children
}

function addRoot(el){
    let oldattrs=getAttributes(el)
    oldattrs.child=[]
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

function addAttr(el){
    let attrs=getAttributes(el)
    return attrs
}

function chooseAttr(obj){
    // 查看data对象里面是否有定义的数据
    
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
        addChild(el)
        
    }
}
class Node{
    constructor(elm,vifdata,vfordata,childs,id){
        this.elm=elm
        this.vif=vifdata||null
        this.vfor=vfordata||null
        this.childs=childs
        this.id=id
    }
    get(){
        console.log(this)
    }

}
Node.count=0
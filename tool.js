function getValueType(value){
    let type=null
    if(typeof value!='object'){
        type = typeof value
    }else{
        if(value instanceof Array){
            type='array'
        }else{
            if(vaule instanceof Object){
                type='object'
            }else{
                type='null'
            }
        }
    }
    return type
}
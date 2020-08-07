//USER ACTION NAMES
export const LOGIN = 'LOGIN'
export const EQUIP = 'EQUIP'
export const DELETE_ITEM = 'DELETE_ITEM'


//USER ACTION CREATORS
export const login = () =>{
    return {type:LOGIN, payload:{user:'hello this is payload from login'}}
}

export const equip = (item) =>{
    return {type:EQUIP, payload:item}
}

export const deleteItem = (item) =>{
    return {type:DELETE_ITEM, payload:item}
}
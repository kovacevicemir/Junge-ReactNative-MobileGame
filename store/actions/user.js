//USER ACTION NAMES
export const LOGIN = 'LOGIN'
export const EQUIP = 'EQUIP'
export const DELETE_ITEM = 'DELETE_ITEM'
export const REMOVE_GLOBAL_MESSAGE = 'REMOVE_GLOBAL_MESSAGE'
export const REDUCE_MANA = 'REDUCE_MANA'


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

export const removeGlobalMessage = () =>{
    return {type:REMOVE_GLOBAL_MESSAGE, payload:{}}
}

export const reduceMana = (mana) =>{
    return {type:REDUCE_MANA, payload:{mana:mana}}
}
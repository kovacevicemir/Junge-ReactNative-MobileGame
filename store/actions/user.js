//USER ACTION NAMES
export const LOGIN = 'LOGIN'
export const EQUIP = 'EQUIP'


//USER ACTION CREATORS
export const login = () =>{
    return {type:LOGIN, payload:{user:'hello this is payload from login'}}
}

export const equip = (item) =>{
    return {type:EQUIP, payload:item}
} 
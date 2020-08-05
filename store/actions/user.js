//USER ACTION NAMES
export const LOGIN = 'LOGIN'


//USER ACTION CREATORS
export const login = () =>{
    return {type:LOGIN, payload:{user:'hello this is payload from login'}}
}
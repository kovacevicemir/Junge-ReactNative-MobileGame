import axios from "axios";

//USER ACTION NAMES
export const LOGIN = 'LOGIN'
export const EQUIP = 'EQUIP'
export const DELETE_ITEM = 'DELETE_ITEM'
export const REMOVE_GLOBAL_MESSAGE = 'REMOVE_GLOBAL_MESSAGE'
export const REDUCE_MANA = 'REDUCE_MANA'
export const SELL_ITEM = 'SELL_ITEM'
export const UPGRADE_ITEM = 'UPGRADE_ITEM'


let server;
    // server = axios.create({baseURL:'/auth/'});
    server = axios.create({
        baseURL:'http://localhost:1337',
    });

let header = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
}


//USER ACTION CREATORS
export const login = (user) =>{

    console.log(user)

    return async(dispatch) =>{
        try {
            // const response = await server.get("/players");
            const response = await axios({
                method:'GET',
                url:'http://192.168.1.17:1337/players'
            })
            // console.log('Response from strapi.io ',response.data)

            let user = response.data[0];

            dispatch({type:LOGIN, payload:user})
        } catch (e) {
            console.log(e)
        }
        
    }
}

export const equip = (item) =>{
    return {type:EQUIP, payload:item}
}

export const deleteItem = (item) =>{
    return {type:DELETE_ITEM, payload:item}
}

export const sellItem = (item) =>{
    return {type:SELL_ITEM, payload:item}
}

export const upgradeItem =(item) =>{
    return {type:UPGRADE_ITEM, payload:item}
}

export const removeGlobalMessage = () =>{
    return {type:REMOVE_GLOBAL_MESSAGE, payload:{}}
}

export const reduceMana = (mana) =>{
    return {type:REDUCE_MANA, payload:{mana:mana}}
}
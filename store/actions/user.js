import axios from "axios";
import Player from '../../models/Player'
import {items,pets,inventories} from '../../data/dummy-data'


//USER ACTION NAMES
export const LOGIN = 'LOGIN'
export const EQUIP = 'EQUIP'
export const DELETE_ITEM = 'DELETE_ITEM'
export const REMOVE_GLOBAL_MESSAGE = 'REMOVE_GLOBAL_MESSAGE'
export const REDUCE_MANA = 'REDUCE_MANA'
export const SELL_ITEM = 'SELL_ITEM'
export const UPGRADE_ITEM = 'UPGRADE_ITEM'
export const SET_OR_REMOVE_ERROR_MESSAGE = 'SET_OR_REMOVE_ERROR_MESSAGE'
export const CREATE_NEW_USER = 'CREATE_NEW_USER'


let server;
    // server = axios.create({baseURL:'/auth/'});
    server = axios.create({
        baseURL:'http://localhost:1337',
    });


//USER ACTION CREATORS
export const login = (user) =>{

    console.log(user)

    let query = `http://192.168.1.17:1337/players?password=${user.password}&email=${user.email.toLowerCase()}`

    return async(dispatch) =>{
        try {
            // const response = await server.get("/players");
            const response = await axios({
                method:'GET',
                url:query
            })
            console.log('Response from strapi.io ',response.data)

            if(response.data[0]){
                let user = response.data[0];
                dispatch({type:LOGIN, payload:user})
            }else{
                console.log('WRONG PASSWORD, EMAIL OR NICKNMAE IS USED')
                dispatch({type:SET_OR_REMOVE_ERROR_MESSAGE, payload:{message:"Wrong email or password!"}})
            }


        } catch (e) {
            console.log(e)
        }
        
    }
}

export const registration = (user) =>{

    console.log(user)

    let query1 = `http://192.168.1.17:1337/players`

    return async(dispatch) =>{
        try {
            // const response = await server.get("/players");
            const response = await axios({
                method:'GET',
                url:query1
            })

            //check if existing email
            let existingEmailCheck = response.data.find(account => account.email == user.email.toLowerCase());
            let existingNickName = response.data.find(account => account.nickname == user.nickname);

            if(!existingEmailCheck && !existingNickName){
                //create new player
                const newPlayer = new Player(
                    Math.random().toString(),
                    user.email,
                    user.nickname,
                    1,1,1,1000,10,5,100,5,5,100,
                    'in2',
                    {weapon:items[0],armor:items[2],shield:items[3]},
                    'https://image.freepik.com/free-vector/gamer-youtuber-gaming-avatar-with-headphones-esport-logo_8169-260.jpg',
                    'my status message',
                    pets[0],
                    user.password
                );

                const response1 = await axios.post(query1,newPlayer);


                if(response1.request.status == 200){
                    dispatch({type:CREATE_NEW_USER, payload:{player:newPlayer, inventory:inventories[1]}})
                }else{
                    dispatch({type:SET_OR_REMOVE_ERROR_MESSAGE, payload:{message:"Something went wrong!"}})
                }


            }else{
                if(existingEmailCheck){
                    dispatch({type:SET_OR_REMOVE_ERROR_MESSAGE, payload:{message:"Account with that email already exists"}})
                }else{
                    dispatch({type:SET_OR_REMOVE_ERROR_MESSAGE, payload:{message:"This nickname is not available"}})
                }
            }

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
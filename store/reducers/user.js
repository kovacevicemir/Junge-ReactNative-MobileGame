//USER REDUCER
import {players} from '../../data/dummy-data'
import {inventories} from '../../data/dummy-data'
import {pets} from '../../data/dummy-data'
import {items} from '../../data/dummy-data'
import {statsTotal} from '../../helpers/statsTotal'
import {attackMob} from '../../helpers/attackMob'
import {isLevelUp} from '../../helpers/isLevelUp'

import {LOGIN, EQUIP, DELETE_ITEM, REMOVE_GLOBAL_MESSAGE, REDUCE_MANA} from '../actions/user'
import {ATTACK_MOB} from '../actions/world'


import Player from '../../models/Player'

let player = players.find(player => player.id === 'u1')
const inventory = inventories.find(inventory => inventory.id === player.inventoryId)

//Calculate player stats
player = statsTotal(player)


const initialState = {
    token:null,
    userId: 'u1',
    player: player,
    inventory: inventory,
    globalMessage:null
}

export default (state = initialState, action) =>{
    switch (action.type) {
        case REMOVE_GLOBAL_MESSAGE:
            return{
                ...state,
                globalMessage:null
            }
        
        case REDUCE_MANA:
            let updatedPlayer = {...state.player}
            updatedPlayer.mana -= action.payload.mana

            return{
                ...state,
                player:updatedPlayer
            }

        case LOGIN:
            
            return state;

        case EQUIP:

            //If equiping item
            if(action.payload.upgrade){
                //Remove item from inventory
                const newInventory = {...state.inventory}
                const inventoryItems = newInventory.items
                const UpdatedInventoryItems = inventoryItems.filter(item => {
                    return item.id != action.payload.id}
                )

                const eqpItems = {...state.player.equipedItems}
                const itemType = action.payload.type
                
                //check if some item is already equiped
                let unequipedItemForInventory;
                if(eqpItems[itemType]){
                    //save equiped item
                    unequipedItemForInventory = eqpItems[itemType]
                    //than equip new item
                    eqpItems[itemType] = action.payload
                    //Store originaly equiped item in user inventory
                    UpdatedInventoryItems.push(unequipedItemForInventory)
                }else{
                    //If no item is equiped
                    //than equip new item
                    eqpItems[itemType] = action.payload
                }

                newInventory.items = UpdatedInventoryItems;
                let updatedPlayer = {...state.player}
                updatedPlayer.equipedItems = eqpItems

                //update stats
                updatedPlayer = statsTotal(updatedPlayer)


                return {
                    ...state,
                    inventory:newInventory,
                    player:updatedPlayer
                    // state
                };

            }else{
                //if equiping pet
                let updatedPlayer = {...state.player}
                //remove pet from inventory
                const newInventory = {...state.inventory}
                const inventoryItems = newInventory.items
                const UpdatedInventoryItems = inventoryItems.filter(item => {
                    return item.id != action.payload.id}
                )

                const pet = {...state.player.pet}
                let unequipedItemForInventory;

                //check if pet is already equiped
                if(pet){
                    //save equiped item
                    unequipedItemForInventory = pet
                    //than equip new item
                    updatedPlayer.pet = action.payload
                    //Store originaly equiped item in user inventory
                    UpdatedInventoryItems.push(unequipedItemForInventory)
                }else{
                    //If no item is equiped
                    //than equip new item
                    updatedPlayer.pet = action.payload
                }

                newInventory.items = UpdatedInventoryItems;

                //update stats
                updatedPlayer = statsTotal(updatedPlayer)

                return {
                    ...state,
                    inventory:newInventory,
                    player:updatedPlayer
                }
            }

        case DELETE_ITEM:
            //Remove item from inventory
            const newInventory = {...state.inventory}
            const inventoryItems = newInventory.items
            const UpdatedInventoryItems = inventoryItems.filter(item => {
                return item.id != action.payload.id}
            )
            newInventory.items = [...UpdatedInventoryItems];
            console.log(newInventory)

            return{
                ...state,
                inventory:newInventory
            }
                        
        case ATTACK_MOB:
            const result = attackMob(action.payload.mob,action.payload.player)
            if(result.win == 'win'){
                let updatedPlayer = {...state.player}
                let newInventory = {...state.inventory}
                // update player exp and gold if win
                updatedPlayer.experience += result.mob.exp
                updatedPlayer.gold += result.mob.gold

                console.log(result.drop)

                if(result.drop != null){
                    console.log('user.js reducer...', result.drop.name)

                    //every time you drop something... you should generate unique item id...
                    //this will be done inside user actions -> backend i guess
                    let newDrop = {...result.drop}
                    newDrop.id = newDrop.id + Math.random();

                    newInventory.items.push(newDrop)
                }

                //check if level up
                let levelUp = isLevelUp(updatedPlayer)
                let levelUpMessage = null;
                if(levelUp){
                    updatedPlayer.level += 1;
                    updatedPlayer.mana = 1000;
                    levelUpMessage = 'Congratz! LVL UP!!!' + updatedPlayer.level +1;

                }

                return {
                    ...state,
                    player:updatedPlayer,
                    globalMessage:levelUpMessage,
                    inventory:newInventory
                }

                
            }else{
                return state;
            }
    
        default:
            return state;
    }
}
//USER REDUCER
import {players} from '../../data/dummy-data'
import {inventories} from '../../data/dummy-data'
import {pets} from '../../data/dummy-data'
import {items} from '../../data/dummy-data'
import {statsTotal} from '../../helpers/statsTotal'

import {LOGIN, EQUIP, DELETE_ITEM} from '../actions/user'
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
}

export default (state = initialState, action) =>{
    switch (action.type) {
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
                        
            
    
        default:
            return state;
    }
}
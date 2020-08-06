//USER REDUCER
import {players} from '../../data/dummy-data'
import {inventories} from '../../data/dummy-data'
import {pets} from '../../data/dummy-data'
import {items} from '../../data/dummy-data'

import {LOGIN, EQUIP} from '../actions/user'
import Player from '../../models/Player'

const player = players.find(player => player.id === 'u1')
const inventory = inventories.find(inventory => inventory.id === player.inventoryId)
const pet = pets.find(pet => pet.id === player.pet)
//get items to player
player.equipedItems.weapon = items.find(item => item.id === player.equipedItems.weapon)
player.equipedItems.armor = items.find(item => item.id === player.equipedItems.armor)
player.equipedItems.shield = items.find(item => item.id === player.equipedItems.shield)


const initialState = {
    token:null,
    userId: 'u1',
    player: player,
    inventory: inventory,
    pet:pet
}

export default (state = initialState, action) =>{
    switch (action.type) {
        case LOGIN:
            
            return state;

        case EQUIP:

            //If equiping item
            if(action.payload.upgrade){
                //Remove item from inventory
                const newInventory = {...inventory}
                const inventoryItems = newInventory.items
                const UpdatedInventoryItems = inventoryItems.filter(item => {
                    return item.id != action.payload.id}
                )

                const eqpItems = {...player.equipedItems}
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
                    //Store originaly equiped item in user inventory
                    UpdatedInventoryItems.push(unequipedItemForInventory)
                }

                newInventory.items = UpdatedInventoryItems;
                const updatedPlayer = {...player}
                updatedPlayer.equipedItems = eqpItems


                return {
                    ...state,
                    inventory:newInventory,
                    player:updatedPlayer
                    // state
                };

            }

            
    
        default:
            return state;
    }
}
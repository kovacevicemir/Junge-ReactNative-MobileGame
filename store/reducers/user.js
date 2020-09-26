//USER REDUCER
import {players} from '../../data/dummy-data'
import {inventories} from '../../data/dummy-data'
import {pets} from '../../data/dummy-data'
import {items} from '../../data/dummy-data'
import {statsTotal} from '../../helpers/statsTotal'
import {attackMob} from '../../helpers/attackMob'
import {isLevelUp} from '../../helpers/isLevelUp'
import {isLevelUpPet} from '../../helpers/isLevelUpPet'
import {upgradeItem} from '../../helpers/upgradeItem'

import {LOGIN, EQUIP, DELETE_ITEM, REMOVE_GLOBAL_MESSAGE, REDUCE_MANA, SELL_ITEM, UPGRADE_ITEM, SET_OR_REMOVE_ERROR_MESSAGE, CREATE_NEW_USER} from '../actions/user'
import {ATTACK_MOB} from '../actions/world'


import Player from '../../models/Player'

// let player = players.find(player => player.nickname === 'player_one')
// const inventory = inventories.find(inventory => inventory.id === player.inventoryId)




const initialState = {
    token:null,
    userId: 'u1',
    player: null,
    inventory: null,
    globalMessage:null,
    errorMessage:null
}

export default (state = initialState, action) =>{
    switch (action.type) {
        case CREATE_NEW_USER:
            return{
                ...state,
                player:action.payload.player,
                inventory:action.payload.inventory
            }

        case SET_OR_REMOVE_ERROR_MESSAGE:
            return{
                ...state,
                errorMessage:action.payload.message
            }

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
            let getPlayer = action.payload;

            console.log('REDUCER getPlayer:::::',getPlayer);

            const inventory = inventories.find(inventory => inventory.id === getPlayer.inventoryId)
            
            //Calculate player stats
            getPlayer = statsTotal(getPlayer)
            return {
                ...state,
                inventory:inventory,
                player:getPlayer
            }

        case EQUIP:

            //If equiping item
            if(action.payload.type != undefined){
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

            return{
                ...state,
                inventory:newInventory
            }

        case SELL_ITEM:
            //Remove item from inventory
        
            const newInventory1 = {...state.inventory}
            const inventoryItems1 = newInventory1.items
            const UpdatedInventoryItems1 = inventoryItems1.filter(item => {
                return item.id != action.payload.id}
            )
            newInventory1.items = [...UpdatedInventoryItems1];

            //add gold to player
            const newPlayer = {...state.player}
            newPlayer.gold += action.payload.gold

            return{
                ...state,
                player:newPlayer,
                inventory:newInventory1
            }

        case UPGRADE_ITEM:
            if(action.payload){
                let afterUpgrade = upgradeItem(action.payload);

                if(afterUpgrade == 'maxtier'){
                    return state;
                } 
    
                const newInventory = {...state.inventory}
                const inventoryItems = newInventory.items

                const newInventoryItems = inventoryItems.map(item => {
                    if(item.id === action.payload.id){
                        return afterUpgrade;
                    }else{
                        return item;
                    }
                })
    
                newInventory.items = newInventoryItems;
    
                return {
                    ...state,
                    inventory:newInventory
                }
            }else{
                return state;
            }


            
                        
        case ATTACK_MOB:
            const result = attackMob(action.payload.mob,action.payload.player)
            if(result.win == 'win'){
                let updatedPlayer = {...state.player}
                let newInventory = {...state.inventory}
                // update player exp and gold if win
                updatedPlayer.experience += result.mob.exp
                updatedPlayer.gold += result.mob.gold

                if(result.drop != null){
                    console.log('user.js reducer drop:', result.drop.name)

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
                    levelUpMessage = 'Congratz! LVL UP ' + updatedPlayer.level + ' !';

                }

                //add pet exp
                if(updatedPlayer.pet.exp < 10000){
                    updatedPlayer.pet.exp += action.payload.petExpMultiplier;
                }

                //check for pet level
                let petLevelCheck = isLevelUpPet(updatedPlayer.pet);
                if(petLevelCheck !== null){
                    updatedPlayer.pet = petLevelCheck;
                    if(levelUpMessage !== null){
                        levelUpMessage = levelUpMessage + "\n Pet level up " + petLevelCheck.level  +" !";
                    }else{
                        levelUpMessage = "Pet level up " + petLevelCheck.level  +" !";
                    }
                }

                //update player stats if pet lvl up or player lvl up
                if(levelUp === true || petLevelCheck){
                    updatedPlayer = statsTotal(updatedPlayer);
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
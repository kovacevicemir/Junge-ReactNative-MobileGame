//USER REDUCER
import {players} from '../../data/dummy-data'
import {inventories} from '../../data/dummy-data'
import {pets} from '../../data/dummy-data'
import {items} from '../../data/dummy-data'

import {LOGIN} from '../actions/user'

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
    
        default:
            return state;
    }
}
//USER REDUCER
import {players} from '../../data/dummy-data'
import {inventories} from '../../data/dummy-data'

import {LOGIN} from '../actions/user'

const player = players.find(player => player.id === 'u1')
const inventory = inventories.find(inventory => inventory.id === player.inventoryId)

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
    
        default:
            return state;
    }
}
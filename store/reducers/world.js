import {worlds} from '../../data/dummy-data'
// new World('w1','Mystic Forest','1-10',[mobs[0],mobs[1]],mobs[3]),
// new World('w2','Puma Mountain','10-20',[mobs[0],mobs[1]],mobs[3])


const initialState = {
    worlds:worlds
}

export default (state = initialState, action) =>{
    switch (action.payload) {
        case true:
            return state
    
        default:
            return state;
    }
}
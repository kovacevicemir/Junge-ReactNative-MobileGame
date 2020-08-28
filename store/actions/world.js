//ACTION NAMES
export const ATTACK_MOB = 'ATTACK_MOB'

//ACTION CREATORS
export const attackMob = (mob,player,worldLevelRange) =>{
    return (dispatch, getState) =>{
        
        const worldLevelRangeArray = worldLevelRange.split('-');
        const petExpMultiplier = parseInt(worldLevelRangeArray[worldLevelRangeArray.length -1]) / 10;

        dispatch({type:ATTACK_MOB, payload:{mob:mob,player:player,petExpMultiplier}})
    }
    
}



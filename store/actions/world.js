//ACTION NAMES
export const ATTACK_MOB = 'ATTACK_MOB'
export const REDUCE_MANA = 'REDUCE_MANA'
export const CAN_EXPLORE = 'DO_I_HAVE_ENOUGH_MANA'

//ACTION CREATORS
export const attackMob = (mob,player) =>{
    return {type:ATTACK_MOB, payload:{mob:mob,player:player}}
}

export const reduceMana = (mana,player) =>{
    return {type:REDUCE_MANA, payload:{mana:mana, player:player}}
}

export const canExplore = (player) =>{
    return {type:CAN_EXPLORE, payload:{player:player}}
}

//ACTION NAMES
export const ATTACK_MOB = 'ATTACK_MOB'

//ACTION CREATORS
export const attackMob = (mob,player) =>{
    return {type:ATTACK_MOB, payload:{mob:mob,player:player}}
}
//INPUT monsters and player
//OUTPUT win:true/false, drop, fightLog(simple)

export const attackMob = (mob,player) =>{

    console.log('attackMob.js: ',mob.name ,player.nickname)

    let win;
    let fightLog = {
        playerAttacks: new Array(),
        monsterAttacks: new Array(),
        playerHp: new Array(),
        monsterHp: new Array()
    }
    let playerHpLeft = player.hp
    let mobHpLeft = mob.hp
    fightLog.playerHp.push(player.hp),
    fightLog.monsterHp.push(mob.hp)

    while(playerHpLeft >= 0 || mobHpLeft >= 0){
        //PLAYER ATTACK
        fightLog.playerAttacks.push(player.attack)
        mobHpLeft -= player.attack
        if(mobHpLeft <= 0){
            fightLog.monsterHp.push(0)
            break;
        }else{
            fightLog.monsterHp.push(mobHpLeft)
        }
        

        //MOB ATTACK
        fightLog.monsterAttacks.push(mob.attack)
        playerHpLeft -= mob.attack
        if(playerHpLeft <= 0){
            fightLog.playerHp.push(0)
            break;
        }else{
            fightLog.playerHp.push(playerHpLeft)
        }
    }

    //did player won?
    playerHpLeft < 0 ? win = false : win = true

    //drop ?
    let rndNum = Math.floor(Math.random() * Math.floor(2))
    let drop = rndNum === 0 ? 'DROP' : 'NO DROP'

    const OUTPUT = {
        win:win,
        drop:drop,
        fightLog:fightLog,
        player:player,
        mob:mob
    }

    return OUTPUT
    

    
}
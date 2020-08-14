//INPUT monsters and player
//OUTPUT win:true/false, drop, fightLog(simple)

export const attackMob = (mob,player) =>{

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
        //check if crit
        let crit = Math.floor(Math.random() * 100) + 1;
        // Math.floor(Math.random() * (max - min + 1)) + min;
        let critMulti = Math.floor(Math.random() * (150 - 130 + 1)) + 130;
        let attMulti = Math.floor(Math.random() * 5) + 1;
        
        let currentPlayerAtt;
        if(crit < player.crit){
            currentPlayerAtt = ((player.attack + (player.attack/100 * attMulti)) / 100) * -critMulti
        }else{
            currentPlayerAtt = player.attack + (player.attack/100 * attMulti)
        }

        currentPlayerAtt = Math.round(currentPlayerAtt);

        fightLog.playerAttacks.push(currentPlayerAtt)
        mobHpLeft -= player.attack
        if(mobHpLeft <= 0){
            fightLog.monsterHp.push(0)
            break;
        }else{
            fightLog.monsterHp.push(mobHpLeft)
        }

        
        

        //MOB ATTACK
        //check if block
        let block = Math.floor(Math.random() * 100) + 1;
        let currentMobAtt;
        if(block < player.block){
            currentMobAtt = 'Block!'
        }else{
            currentMobAtt = mob.attack - player.deffense
            if(currentMobAtt <0){
                currentMobAtt = 1;
            }
        }
        
        fightLog.monsterAttacks.push(currentMobAtt)
        playerHpLeft -= mob.attack
        if(playerHpLeft <= 0){
            fightLog.playerHp.push(0)
            break;
        }else{
            fightLog.playerHp.push(playerHpLeft)
        }
    }

    //did player won?
    playerHpLeft < 0 ? win = 'lost' : win = 'win'

    //drop ?
    let rndNum = Math.floor(Math.random() * Math.floor(2))
    let drop = rndNum === 0 ? 'DROP' : null

    const OUTPUT = {
        win:win,
        drop:drop,
        fightLog:fightLog,
        player:player,
        mob:mob
    }

    return OUTPUT
    

    
}
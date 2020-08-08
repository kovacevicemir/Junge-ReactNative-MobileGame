// Calculate total player stats from experience to attack, mana etc.

export const statsTotal = (player) =>{
    //CALCULATE ITEMS TOTAL
        //@total attack
        let TotalAttack = 10;
        TotalAttack += player.equipedItems.weapon.attack
        TotalAttack += player.equipedItems.armor.attack
        TotalAttack += player.equipedItems.shield.attack

        //@total deffense
        let TotalDeffense = 5;
        TotalDeffense += player.equipedItems.weapon.deffense
        TotalDeffense += player.equipedItems.armor.deffense
        TotalDeffense += player.equipedItems.shield.deffense

        //@total block
        let TotalBlock = 0;
        TotalBlock += player.equipedItems.weapon.block
        TotalBlock += player.equipedItems.armor.block
        TotalBlock += player.equipedItems.shield.block

        //@total critical
        let TotalCritical = 0;
        TotalCritical += player.equipedItems.weapon.critical
        TotalCritical += player.equipedItems.armor.critical
        TotalCritical += player.equipedItems.shield.critical
    

    //ADD PET STATUS ON IT
        //@total attack
        TotalAttack += player.pet.attack
        //@total deffense
        TotalDeffense += player.pet.deffense
        //@total hp
        let TotalHp = player.pet.hp
        console.log(TotalHp)


    //MULTIPLY HP BASED ON LEVEL
        //Get level radius 1-10,10-20 etc. 1-10 is 1 , 10-20 is 2 etc
        let levelRadius;
        switch (true) {
            case player.level < 10:
                levelRadius = 1
                break;
            case player.level < 20:
                levelRadius = 1.2
                break;
            case player.level < 30:
                levelRadius = 1.4
                break;
            case player.level < 40:
                levelRadius = 1.6
                break;
            case player.level < 50:
                levelRadius = 2
                break;
        
            default:
                break;
        }

        //ALGO: TotalHp = 100 * 13(lvl) * 1.2 => 1300 * 1.2 =  1560
        TotalHp += (100 * player.level) * levelRadius

    //RETURN PLAYER AFTER UPDATING TOTAL STATUSES
    player.attack = TotalAttack
    player.deffense = TotalDeffense
    player.crit = TotalCritical
    player.block = TotalBlock
    player.hp = TotalHp
    player.hourMana = player.pet.mana + 20

    return player
}
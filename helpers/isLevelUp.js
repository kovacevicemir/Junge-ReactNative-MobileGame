//INPUT player
//OUTPUT true or false

export const levelScale = {
    lvl1:10,
    lvl2:30,
    lvl3:60,
    lvl4:90,
    lvl5:150,
    lvl6:250,
    lvl7:350,
    lvl8:480,
    lvl9:650,
    lvl10:850,
    lvl11:999999
}

export const isLevelUp = (player) =>{

    const currentLevel = player.level
    let newLevel = player.level;


    switch (true) {
        case (player.experience < levelScale.lvl1):
            newLevel = 1;
            break; 
        case (player.experience < levelScale.lvl2):
            newLevel = 2;
            break; 
        case (player.experience < levelScale.lvl3):
            newLevel = 3;
            break; 
        case (player.experience < levelScale.lvl4):
            newLevel = 4;
            break; 
        case (player.experience < levelScale.lvl5):
            newLevel = 5;
            break; 
        case (player.experience < levelScale.lvl6):
            newLevel = 6;
            break; 
        case (player.experience < levelScale.lvl7):
            newLevel = 7;
            break; 
        case (player.experience < levelScale.lvl8):
            newLevel = 8;
            break; 
        case (player.experience < levelScale.lvl9):
            newLevel = 9;
            break; 
        case (player.experience < levelScale.lvl10):
            newLevel = 10;
            break; 
        case (player.experience < levelScale.lvl11):
            newLevel = 10;
            break; 
    
        default:
            break
    }

   
    if(currentLevel !== newLevel){
        return true
    }else{
        return false
    }
}
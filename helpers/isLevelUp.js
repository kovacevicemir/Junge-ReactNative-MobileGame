//INPUT player
//OUTPUT true or false

export const isLevelUp = (player) =>{

    const currentLevel = player.level
    let newLevel = player.level;


    switch (true) {
        case (player.experience < 4):
            newLevel = 1;
            break; 
        case (player.experience < 8):
            newLevel = 2;
            break; 
        case (player.experience < 12):
            newLevel = 3;
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
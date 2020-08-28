//INPUT pet
//OUTPUT null if same level, pet if level up

export const isLevelUpPet = (pet) =>{

    const currentLevel = pet.level
    let newLevel = pet.level;


    switch (true) {
        case (pet.exp < 10):
            newLevel = 1;
            break; 
        case (pet.exp < 100):
            newLevel = 2;
            break; 
        case (pet.exp < 300):
            newLevel = 3;
            break;
        case (pet.exp < 1000):
            newLevel = 4;
            break;
        case (pet.exp < 1650):
            newLevel = 5;
            break;
        case (pet.exp < 2500):
            newLevel = 6;
            break;
        case (pet.exp < 4000):
            newLevel = 7;
            break;
        case (pet.exp < 5750):
            newLevel = 8;
            break;
        case (pet.exp < 8000):
            newLevel = 9;
            break;
        case (pet.exp <= 10000):
            newLevel = 10;
            break;
    
        default:
            break
    }

   
    if(currentLevel !== newLevel){
        pet.level += 1;
        if(pet.attack){
            pet.attack += 5;
        }
        if(pet.deffense){
            pet.deffense +3;
        }
        if(pet.hp){
            pet.hp += Math.ceil(pet.hp * 0.1)
        }
        if(pet.mana){
            pet.mana += 5;
        }

        return pet
    }else{
        return null
    }
}
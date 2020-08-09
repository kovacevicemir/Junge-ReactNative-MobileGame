//INPUT monsters from world area 1-10 for example
//OUTPUT random number of random mobs from it and return

export const getRandomMobs = (monsters,boss) =>{

    let rndNum = Math.floor(Math.random() * Math.floor(2))

    if(rndNum === 1){
        return monsters
    }else{
        let bossArray = new Array()
        bossArray.push(boss)
        return bossArray
    }
}
//INPUT monsters from world area 1-10 for example
//OUTPUT random number of random mobs from it and return

export const getRandomMobs = (monsters,boss) =>{
    let rndNum = Math.floor(Math.random() * 100);

    if(rndNum < 90){
        let randStart = Math.floor(Math.random() * monsters.length);
        if(randStart == monsters.length){
            randStart -= 1;
        }
        let randomMonsters = monsters.sort(() => Math.random() - Math.random()).slice(randStart, monsters.length)
        return randomMonsters
    }else{
        let bossArray = new Array()
        bossArray.push(boss)
        return bossArray
    }
}
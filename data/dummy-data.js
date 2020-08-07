import Item from '../models/Item'
import Mob from '../models/Mob'
import Pet from '../models/Pet'
import Player from '../models/Player'
import Inventory from '../models/Inventory'
import World from '../models/World'

export const items = [
    //id,name,attack,deffense,block,critical,level,upgrade,image,gold
    new Item('i1','Axe',12,0,0,5,1,1,'https://lh3.googleusercontent.com/-CJHeNzSEHkE/WqHJ28G5f7I/AAAAAAAAA0c/ht3V5_iHI3s6Sh5Uu5xj9u8xf6YnzuW-ACLcBGAs/h190/Small+Axe.png', 1, 'weapon'),
    new Item('i5','AxeInventory',12,0,0,5,1,1,'https://wiki.guildwars.com/images/f/f2/Spiked_Axe.jpg', 1, 'weapon'),
    new Item('i2','Armor',2,4,2,2,1,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5BgWPwDJCWwvDrxHTAQ4PvmsTgP3vK2t72A&usqp=CAU', 1, 'armor'),
    new Item('i3','Shield',0,7,3,0,1,1,'https://www.mubufon.com/wp-content/uploads/2019/12/img_shield_kiteshield.jpg', 1, 'shield')
]

export const mobs = [
    //id,name,level,attack,hp,exp,drop,dropChance,image,gold
    new Mob('m1','monster_one',1,4,100,1,'i1',20,'https://www.freemmostation.com/wp-content/uploads/2012/05/kal-online-21.jpg',1),
    new Mob('m2','monster_two',2,8,110,2,'i2',15,'https://muonlinefanz.com/tools/mobs/data/graphics/Hommerd.jpg',2),
    new Mob('m3','monster_three',3,20,150,3,'i3',10,'https://www.plantbasednews.org/.image/t_share/MTY4OTc1MzM2MDMyMTgzNzg0/joerogan.jpg',3)

]

export const pets = [
    //id,name,level,mana,exp,attack,deffense,hp,image
    new Pet('p1','cat',1,20,1,1,1,10,'https://media0.giphy.com/media/B9yqVMxkcBpu0/giphy.gif', 10),
    new Pet('p2','dog',5,30,1,0,1,20,'https://pbs.twimg.com/profile_images/528591999272644608/agjfAJAW_400x400.jpeg', 20),
    new Pet('p3','wolf',10,50,1,1,3,30,'https://i.pinimg.com/236x/e6/af/d7/e6afd79712210fc1b2c168ac588a8b08--she-s-glow.jpg', 30),
]

export const players = [
    new Player('u1','player1@gmail.com','player_one',1,1,1,1000,10,5,100,5,5,100,'in1',{weapon:items[0],armor:items[2],shield:items[3]},'https://image.freepik.com/free-vector/gamer-youtuber-gaming-avatar-with-headphones-esport-logo_8169-260.jpg','my status message',pets[0]),
    new Player('u2','player2@gmail.com','player_two',1,1,1,1000,10,5,100,5,5,100,'in2',{weapon:items[0],armor:items[2],shield:items[3]},'https://image.freepik.com/free-vector/gamer-youtuber-gaming-avatar-with-headphones-esport-logo_8169-260.jpg','my status message',pets[1]),
    new Player('u3','player3@gmail.com','player_three',1,1,1,1000,10,5,100,5,5,100,'in3',{weapon:items[0],armor:items[2],shield:items[3]},'https://image.freepik.com/free-vector/gamer-youtuber-gaming-avatar-with-headphones-esport-logo_8169-260.jpg','my status message',pets[2])
]

export const inventories = [
    new Inventory('in1',[items[1],items[2],pets[1]]),


    new Inventory('in2',['i1','i2','i3']),
    new Inventory('in3',['i1','i2','i3'])
]

export const worlds = [
    //id,name,levelRange,monsters,boss
    new World('w1','Mystic Forest','1-10',[mobs[0],mobs[1]],mobs[2]),
    new World('w2','Puma Mountain','10-20',[mobs[0],mobs[1]],mobs[2])
]
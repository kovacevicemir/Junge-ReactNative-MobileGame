import Item from '../models/Item'
import Mob from '../models/Mob'
import Pet from '../models/Pet'
import Player from '../models/Player'
import Inventory from '../models/Inventory'

export const items = [
    new Item('i1','Axe',12,0,0,5,1,1,'https://lh3.googleusercontent.com/-CJHeNzSEHkE/WqHJ28G5f7I/AAAAAAAAA0c/ht3V5_iHI3s6Sh5Uu5xj9u8xf6YnzuW-ACLcBGAs/h190/Small+Axe.png', 1),
    new Item('i2','Armor',2,4,2,2,1,1,'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT5BgWPwDJCWwvDrxHTAQ4PvmsTgP3vK2t72A&usqp=CAU', 1),
    new Item('i3','Shield',0,7,3,0,1,1,'https://www.mubufon.com/wp-content/uploads/2019/12/img_shield_kiteshield.jpg', 1)
]

export const mobs = [
    //id,name,level,attack,hp,exp,drop,dropChance,image,gold
    new Mob('m1','monster_one',1,4,100,1,'i1',20,'https://www.freemmostation.com/wp-content/uploads/2012/05/kal-online-21.jpg',1),
    new Mob('m2','monster_two',2,8,110,2,'i2',15,'https://muonlinefanz.com/tools/mobs/data/graphics/Hommerd.jpg',2),
    new Mob('m3','monster_three',3,20,150,3,'i3',10,'data:image/jpeg;base64,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',3)

]

export const pets = [
    //id,name,level,mana,exp,attack,deffense,hp,image
    new Pet('p1','cat',1,20,1,1,1,10,'https://i.imgur.com/rYnQRne.jpg'),
    new Pet('p2','dog',5,30,0,0,1,20,'https://pbs.twimg.com/profile_images/528591999272644608/agjfAJAW_400x400.jpeg'),
    new Pet('p3','wolf',10,50,1,1,3,30,'https://i.pinimg.com/236x/e6/af/d7/e6afd79712210fc1b2c168ac588a8b08--she-s-glow.jpg'),
]

export const players = [
    new Player('u1','player1@gmail.com','player_one',1,1,1,1000,10,5,100,5,5,100,'in1',{'weapon':'i1','armor':'i2','shield':'i3'},'https://image.freepik.com/free-vector/gamer-youtuber-gaming-avatar-with-headphones-esport-logo_8169-260.jpg','my status message','p1'),
    new Player('u2','player2@gmail.com','player_two',1,1,1,1000,10,5,100,5,5,100,'in2',{'weapon':'i1','armor':'i2','shield':'i3'},'https://image.freepik.com/free-vector/gamer-youtuber-gaming-avatar-with-headphones-esport-logo_8169-260.jpg','my status message','p2'),
    new Player('u3','player3@gmail.com','player_three',1,1,1,1000,10,5,100,5,5,100,'in3',{'weapon':'i1','armor':'i2','shield':'i3'},'https://image.freepik.com/free-vector/gamer-youtuber-gaming-avatar-with-headphones-esport-logo_8169-260.jpg','my status message','p3')
]

export const inventories = [
    new Inventory('iv1',['i1','i2','i3']),
    new Inventory('iv2',['i1','i2','i3']),
    new Inventory('iv3',['i1','i2','i3'])
]
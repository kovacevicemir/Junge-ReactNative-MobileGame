//UPGRADE ITEM

export const upgradeItem = (item) => {
  if(item.upgrade === 3){
      return 'maxtier'
  }

  let upgradeCost;
  let upgradeUpd;
  switch (item.upgrade) {
    case 0:
      upgradeCost = item.level * 50;
      upgradeUpd = "10%";
      break;
    case 1:
      upgradeCost = item.level * 75;
      upgradeUpd = "15%";
      break;
    case 2:
      upgradeCost = item.level * 100;
      upgradeUpd = "20%";
      break;
    case 3:
      upgradeCost = "Max upgrade Tier3 !";
      upgradeUpd = "You cannot upgrade this item!";
    default:
      break;
  }


  let updatedItem = item;
  updatedItem.attack = updatedItem.attack + Math.ceil(updatedItem.attack * 0.1);
  updatedItem.deffense =  updatedItem.deffense + Math.ceil(updatedItem.deffense * 0.1);
  if(item.upgrade === 2){
      updatedItem.critical += 1;
      updatedItem.block +=1;
  }
  updatedItem.gold = updatedItem.gold +  Math.ceil(upgradeCost * 0.33);
  updatedItem.upgrade += 1;

  console.log(updatedItem)
  return updatedItem;

};

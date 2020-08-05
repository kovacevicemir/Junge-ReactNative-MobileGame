class Player {
  constructor(
    id,
    email,
    nickname,
    level,
    experience,
    gold,
    mana,
    attack,
    deffense,
    hp,
    block,
    crit,
    hourMana,
    inventoryId,
    equipedItems,
    image,
    profileStatus,
    pet
  ) {
    (this.id = id),
      (this.email = email),
      (this.nickname = nickname),
      (this.level = level),
      (this.experience = experience),
      (this.gold = gold),
      (this.mana = mana),
      (this.attack = attack),
      (this.deffense = deffense),
      (this.hp = hp),
      (this.block = block),
      (this.crit = crit),
      (this.hourMana = hourMana),
      (this.inventoryId = inventoryId),
      (this.equipedItems = equipedItems),
      (this.image = image),
      (this.profileStatus = profileStatus),
        this.pet = pet;
  }
}

export default Player;

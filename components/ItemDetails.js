import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import Colors from "../assets/Colors";

const ItemDetails = (props) => {
  const { clickedThing, fontColor } = props;

  if (clickedThing.exp) {
    // PET
    return (
      <View>
        <Image
          style={styles.imageContainerPet}
          source={{ uri: clickedThing.image }}
        />
        <Text style={styles.gamingFontBig}>{clickedThing.name}</Text>
        <Text style={styles.gamingFontNormal}>level:{clickedThing.level}</Text>
        <Text style={styles.gamingFontNormal}>Exp:{clickedThing.exp}</Text>
        <Text style={styles.gamingFontNormal}>+Attack:{clickedThing.attack}</Text>
        <Text style={styles.gamingFontNormal}>
          +Deffense:{clickedThing.deffense}
        </Text>
        <Text style={styles.gamingFontNormal}>
          +Health Point:{clickedThing.hp}
        </Text>
        <Text style={styles.gamingFontNormal}>
          +Mana per Hour:{clickedThing.mana}
        </Text>
        <Text style={styles.gamingFontNormal}>Gold:{clickedThing.gold}</Text>
      </View>
    );
  }

  const ItemUpgradesComponent = () => {
    let tiersIconImageArray = new Array();
    for (let i = 0; i < clickedThing.upgrade; i++) {
      tiersIconImageArray.push(
        <Image
          style={styles.tiersIconImage}
          source={{ uri: Colors.ItemTiers[i] }}
        />
      );
    }

    return tiersIconImageArray;
  };

  //ITEM
  return (
    <View style={styles.itemContainer}>
      <ImageBackground
        style={styles.imageContainer}
        source={{ uri: clickedThing.image }}
      />
      <Text style={styles.gamingFontBig}>{clickedThing.name}</Text>
      <View style={styles.itemUpgrades}>
        <ItemUpgradesComponent />
      </View>
      <Text style={styles.gamingFontNormal}>Attack:{clickedThing.attack}</Text>
      <Text style={styles.gamingFontNormal}>Deffense:{clickedThing.deffense}</Text>
      <Text style={styles.gamingFontNormal}>
        Critical:{clickedThing.critical}%
      </Text>
      <Text style={styles.gamingFontNormal}>Block:{clickedThing.block}%</Text>
      <Text style={styles.gamingFontNormal}>level:{clickedThing.level}</Text>
      <Text style={styles.gamingFontNormal}>Tier:{clickedThing.upgrade}</Text>
      <Text style={styles.gamingFontNormal}>Gold:{clickedThing.gold}</Text>
    </View>
  );
};

export default ItemDetails;

const styles = StyleSheet.create({
  imageContainer: {
    minHeight: 200,
    minWidth: 150,
  },
  imageContainerPet: {
    minHeight: 175,
    minWidth: 175,
  },
  itemUpgrades: {
    display: "flex",
    flexDirection: "row",
  },
  tiersIconImage: {
    minHeight: 20,
    minWidth: 20,
  },
  gamingFontNormal: {
    fontFamily: "Gaming",
    fontSize: 16,
    color:"rgb(176,175,173)"
  },
  gamingFontBig: {
    fontFamily: "Gaming",
    fontSize: 20,
    color:"rgb(6,101,195)",
    letterSpacing:1
  },
});

import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Platform, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import * as Font from 'expo-font';



const Homepage = (props) => {

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Welcome to the Jungle! open beta v1.0</Text>

      <Text style={styles.heading}>How to start ?</Text>
      <Text style={styles.section}>
        Click on World icon in bottom right corner of the screen. Pick World
        area (1-10 for begginer) and click on monster to attack.
      </Text>
      <Text style={styles.section}>
        To change World area swipe left on top section of the screen.
      </Text>

      <Text style={styles.heading}>Leveling up & Experience</Text>
      <Text style={styles.section}>
        On every kill you will get experience reward and possible item drop. New
        items can be dropped by killing monsters and you can find them inside
        your inventory. Click inventory icon. Click on Equip to equip item.
      </Text>

      <Text style={styles.section}>
        After level 10 player +20% health points bonus. After level 20 player
        +40% health points bonus. After level 30 player +60% health points
        bonus. After level 40 player +100% health points bonus. Maximum level is
        50
      </Text>

      <Text style={styles.heading}>Pet system</Text>
      <Text style={styles.section}>
        You can train your pet by attacking monsters. Everytime you attack
        monster your pet is attacking the monster together with you. Max level
        is 10.
      </Text>

      <Text style={styles.heading}>Mana</Text>
      <Text style={styles.section}>
        Mana regeneration happens every 60 minutes. By default player mana
        regeneration per hour is 20. You can increase mana regeneration by
        equiping mana based pet. (explore world and kill mini bosses to find
        pet`s).
      </Text>
      <Text style={styles.section}>
        Everytime when you explore area (1 swipe right) your mana will be
        reduced by 1 or more. The higher world area the more mana it cost to
        explore.
      </Text>

      <Text style={styles.heading}>Items & item upgrade</Text>
      <Text style={styles.section}>
        Click on inventory icon (bottom of the screen). Here you can equip,
        delete, sell or upgrade items.
      </Text>
      <Text style={styles.section}>To upgrade item click on item.</Text>

      <Text style={styles.heading}>Coming soon:</Text>
      <Text style={styles.section}>
        Trade system, Market, Player ranking, Player combat, Quests and more!
      </Text>
      <View style={{ marginBottom: 75 }}></View>
    </ScrollView>
  );
};

Homepage.navigationOptions = (navData) => {
  return {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Home"
          iconName={Platform.OS === "android" ? "ios-help-circle" : "ios-help-circle"}
          onPress={() => {
            navData.navigation.navigate("Home");
            console.log("HOMEPAGE!");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default Homepage;

const styles = StyleSheet.create({
  container: {
    padding: 22,
  },
  section: {
    marginBottom: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    fontFamily: "Gaming",
  },
});

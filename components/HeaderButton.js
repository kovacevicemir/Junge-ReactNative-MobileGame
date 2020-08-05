import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../assets/Colors";
import { Platform } from "react-native";
import { useSelector } from "react-redux";

const CustomHeaderButton = (props) => {

  const player = useSelector(state=>state.user.player)



  return (
    <View style={styles.wholeNav}>
       
      {player && <View style={styles.navStats}>
        <Text>Level {player.level}</Text>
        <Text>Exp {player.experience}</Text>
        <Text>Gold {player.gold}</Text>
        <Text>Mana {player.mana}</Text>
      </View>}
      <HeaderButton
        {...props}
        IconComponent={Ionicons}
        iconSize={30}
        color={Platform.OS === "android" ? "white" : Colors.primary}
      />
    </View>
  );
};

export default CustomHeaderButton;

const styles = StyleSheet.create({
    wholeNav:{
        flexDirection:'row',
        flex:1
    },
    navStats:{
        flexDirection:'row',
        minWidth:220,
        justifyContent:'space-between',
        alignItems:'center',
    }
});

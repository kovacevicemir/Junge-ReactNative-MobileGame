import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../assets/Colors";
import { Platform } from "react-native";

const CustomHeaderButton = (props) => {
  return (
    <View style={styles.wholeNav}>
      <View style={styles.navStats}>
        <Text>Nick</Text>
        <Text>Level</Text>
        <Text>Exp</Text>
        <Text>$192</Text>
        <Text>Mana</Text>
      </View>
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

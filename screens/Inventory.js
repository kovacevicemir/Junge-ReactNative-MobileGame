import React from 'react'
import { StyleSheet, Text, View, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const Inventory = () => {
    return (
        <View>
            <Text>INVENTORY</Text>
        </View>
    )
}

Inventory.navigationOptions = {
    headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Home"
            iconName={Platform.OS === "android" ? "home" : "ios-home"}
            onPress={()=>{
                // navData.navigation.navigate('Home');
                console.log('HOMEPAGE!')
            }}
          />
        </HeaderButtons>
      ),
}

export default Inventory

const styles = StyleSheet.create({})

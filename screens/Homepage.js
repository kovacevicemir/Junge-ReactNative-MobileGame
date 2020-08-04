import React from 'react'
import { StyleSheet, Text, View, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const Homepage = (props) => {
    return (
        <View>
            <Text>Homepage</Text>
        </View>
    )
}

Homepage.navigationOptions = navData =>{
    return {
    headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Home"
            iconName={Platform.OS === "android" ? "home" : "ios-home"}
            onPress={()=>{
                navData.navigation.navigate('Home');
                console.log('HOMEPAGE!')
            }}
          />
        </HeaderButtons>
      ),
    }
}

export default Homepage

const styles = StyleSheet.create({})

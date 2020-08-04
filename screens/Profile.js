import React from 'react'
import { StyleSheet, Text, View, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const Profile = (props) => {
    return (
        <View>
            <Text>PROFILE</Text>
        </View>
    )
}

Profile.navigationOptions = navData =>{
    return {
    headerRight: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Home"
            iconName={Platform.OS === "android" ? "home" : "ios-home"}
            onPress={()=>{
                navData.navigation.navigate('Home');
            }}
          />
        </HeaderButtons>
      ),
    }
}

export default Profile

const styles = StyleSheet.create({})

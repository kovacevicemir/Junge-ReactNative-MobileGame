import { createStackNavigator, createAppContainer, createSwitchNavigator } from "react-navigation";
import React from 'react'

import { createBottomTabNavigator } from "react-navigation-tabs";
import {Platform, Button} from 'react-native';
import Authentication from "../screens/Authentication";
import Homepage from "../screens/Homepage";
import Profile from "../screens/Profile";
import Shop from "../screens/Shop";
import World from "../screens/World";
import Inventory from "../screens/Inventory"
import Colors from "../assets/Colors"
import { Ionicons } from "@expo/vector-icons";

'#161616'

const defNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? '#161616' : '#161616',
  },
  headerTintColor: Platform.OS === "android" ? "white" : '',
}

const ProfileNavigation = createStackNavigator(
  {
    Profile:Profile,
    Home:Homepage
  },
  {
    defaultNavigationOptions: defNavOptions
  }
);

const InventoryNavigation = createStackNavigator(
    {
      Inventory:Inventory,
      Home:Homepage,
      Shop:Shop
    },
    {
      defaultNavigationOptions: defNavOptions
    }
  );

const WorldNavigation = createStackNavigator(
    {
      World:World,
      Home:Homepage
    },
    {
      defaultNavigationOptions: defNavOptions
      
    },
    
  );

const JungleBottom = createBottomTabNavigator(
    {
      //First Argument
      Profile: {
        screen: ProfileNavigation,
        navigationOptions: {
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="ios-person"
                size={25}
                color={tabInfo.tintColor}
              />
            );
          },
        },

      },
      Backpack: {
        screen: InventoryNavigation,
        navigationOptions: {
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons name="ios-briefcase" size={25} color={tabInfo.tintColor} />
            );
          },
        },
      },
      Jungle: {
        screen: WorldNavigation,
        navigationOptions: {
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons name="ios-paw" size={25} color={tabInfo.tintColor} />
            );
          },
          
        },
      },
    },
    {
      //Second argument
      tabBarOptions: {
        activeTintColor: 'orange',
        style:{
          backgroundColor: '#161616',
          padding:7
        },
        labelStyle:{
          fontFamily:"Gaming",
          fontSize:15
        }
      },
    }
  );


  const MainNav = createSwitchNavigator(
    {
        Auth:Authentication,
        Home:JungleBottom,
    },
  );
  


export default createAppContainer(MainNav);

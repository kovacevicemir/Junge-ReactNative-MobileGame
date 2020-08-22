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

const ProfileNavigation = createStackNavigator(
  {
    Profile:Profile,
    Home:Homepage
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    },
  }
);

const InventoryNavigation = createStackNavigator(
    {
      Inventory:Inventory,
      Home:Homepage,
      Shop:Shop
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "",
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      },
    }
  );

const WorldNavigation = createStackNavigator(
    {
      World:World,
      Home:Homepage
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: Platform.OS === "android" ? Colors.primary : "",
        },
        headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      },
      
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
      Inventory: {
        screen: InventoryNavigation,
        navigationOptions: {
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons name="ios-briefcase" size={25} color={tabInfo.tintColor} />
            );
          },
        },
      },
      World: {
        screen: WorldNavigation,
        navigationOptions: {
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons name="ios-business" size={25} color={tabInfo.tintColor} />
            );
          },
          
        },
      },
    },
    {
      //Second argument
      tabBarOptions: {
        activeTintColor: Colors.accentColor,
        style:{
          backgroundColor: Colors.primaryColor
        }
      },
    }
  );


  const MainNav = createSwitchNavigator(
    {
        Home:JungleBottom,
        Auth:Authentication,
    },
  );
  


export default createAppContainer(MainNav);

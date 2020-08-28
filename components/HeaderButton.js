import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../assets/Colors";
import { Platform } from "react-native";
import { useSelector } from "react-redux";
import {levelScale} from '../helpers/isLevelUp'

const CustomHeaderButton = (props) => {
  const [player, setPlayer] = useState()
  const fetchPlayer = useSelector(state=>state.user.player)
  
  useEffect(()=>{
    setPlayer(fetchPlayer)
  },[fetchPlayer])

  if(player){
    let NextLevel = levelScale[`lvl${player.level}`]
    if(NextLevel > 1000){
      NextLevel = Math.ceil(NextLevel / 1000) + "K"
    }
  
    let playerExperience = player.experience
    if(playerExperience > 1000){
      playerExperience = Math.floor(playerExperience / 1000) + "K" 
    }
  
    return (
      <View style={styles.wholeNav}>
         
        {player && <View style={styles.navStats}>
          <Text style={styles.gamingFontNormal}>Exp {playerExperience}/{NextLevel}</Text>
          <Text style={styles.gamingFontNormal}>
            {player.gold}
            <Image style={{width:14, height:14}} source={{uri:"https://d1a9v60rjx2a4v.cloudfront.net/2013/10/03/07_52_11_387_coin_cam1_1.jpg"}} />
  
          </Text>
          <Text style={styles.gamingFontNormal}>
            {player.mana}
            <Image style={{width:15, height:15}} source={{uri:"https://st3.depositphotos.com/2850905/16651/v/450/depositphotos_166518466-stock-illustration-sphere-of-water-game-icon.jpg"}} />
  
          </Text>
        </View>}
        <HeaderButton
          {...props}
          IconComponent={Ionicons}
          iconSize={30}
          color={Platform.OS === "android" ? "white" : Colors.primary}
        />
      </View>
    );
  }else{
    return <Text>Loading player</Text>
  }

  
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
    },
    textStyle:{
      color:'white'
    },
    gamingFontNormal:{
      color:Colors.primaryFont,
      fontFamily: "Gaming",
      fontSize:16
    },
    gamingFontBig:{
      color:Colors.primaryFont,
      fontFamily: "Gaming",
      fontSize:20
    }
});

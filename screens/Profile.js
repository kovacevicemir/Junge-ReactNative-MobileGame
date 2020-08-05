import React,{useEffect, useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../assets/Colors";
import {useSelector} from 'react-redux'

const Profile = (props) => {
  const fetchPlayer = useSelector(state => state.user.player)
  const fetchPet = useSelector(state => state.user.pet)
  const [player, setPlayer] = useState()
  const [pet, setPet] = useState()

  useEffect(()=>{
    setPlayer(fetchPlayer)
    setPet(fetchPet)
  },[fetchPlayer,fetchPet])

  if(!player || !pet){
      return <Text>Trying to fetch Player or Pet... loading</Text>
  }


  return (
    <View style={styles.profileContainer}>
      <ScrollView style={styles.scrollView}>
        {/* Top Section */}
        <View style={styles.topSection}>
          {/* Picture & Status message */}
          <View>
            <Image
              style={styles.profilePicture}
              source={{
                uri:
                  player.image,
              }}
            />
            <Text>{player.profileStatus}</Text>
          </View>
          {/* Profile details */}
          <View style={styles.profileDetails}>
            <Text>{player.nickname}</Text>
            <Text>Level: {player.level}</Text>
            <Text>Experience: {player.experience}</Text>
            <Text>Gold: {player.gold}</Text>
          </View>
        </View>

        {/* Middle Section */}
        <View style={styles.midSection}>
          {/* Weapon */}
          <TouchableOpacity style={styles.weapon} onPress={()=> {console.log('weapon clicked')}}>
              <Image style={styles.itemImage} source={{uri:player.equipedItems.weapon.image}} />
          </TouchableOpacity>

          {/* Armor */}
          <TouchableOpacity style={styles.armor} onPress={()=> {console.log('armor clicked')}}>
            <Image style={styles.itemImage} source={{uri:player.equipedItems.armor.image}} />
          </TouchableOpacity>

          {/* Shield */}
          <TouchableOpacity style={styles.shield} onPress={()=> {console.log('shield clicked')}}>
            <Image style={styles.itemImage} source={{uri:player.equipedItems.shield.image}} />
          </TouchableOpacity>
        </View>

        {/* BottomSection */}
        <View style={styles.petContainer}>
          {/* pet */}
          <View style={styles.pet}>
              <Image style={styles.petPicture} source={{uri:pet.image}} />
              <View style={styles.petName}>
                <Text >Pet: {pet.name}</Text>
              </View>
          </View>

          {/* playerStatus */}
          <View style={styles.playerStatus}>
            <Text>PLAYER SUMMARY</Text>
            <Text>Attack: {player.attack}</Text>
            <Text>Deffense: {player.deffense}</Text>
            <Text>Health Points: {player.hp}</Text>
            <Text>Critical: {player.crit}%</Text>
            <Text>Block: {player.block}%</Text>
            <Text>Mana: {player.hourMana} per hour</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// id,
// email,
// nickname,
// level,
// experience,
// gold,
// mana,
// attack,
// deffense,
// hp,
// block,
// crit,
// hourMana,
// inventoryId,
// equipedItems,
// image,
// profileStatus,
// pet

Profile.navigationOptions = (navData) => {
  return {
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Home"
          iconName={Platform.OS === "android" ? "home" : "ios-home"}
          onPress={() => {
            navData.navigation.navigate("Home");
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default Profile;

const styles = StyleSheet.create({
  profileContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {},
  profilePicture: {
    width: 170,
    height: 150,
  },
  topSection: {
    flex: 1,
    flexDirection: "row",
  },
  profileDetails: {
    marginLeft: 10,
    marginBottom: 20,
    justifyContent: "space-between",
    backgroundColor: "white",
    minWidth: 170,
  },
  midSection: {
    marginTop: 50,
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  weapon: {
    width: 100,
    height: 150,
    backgroundColor: "white",
  },
  armor: {
    width: 120,
    height: 200,
    backgroundColor: "white",
    marginLeft: 10,
    marginRight: 10,
  },
  shield: {
    width: 100,
    height: 150,
    backgroundColor: "white",
  },
  petContainer: {
    marginTop: 30,
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  pet: {
    width: 130,
    height: 130,
    backgroundColor: "white",
  },
  petPicture:{
      width:130,
      height:110
  },
  petName:{
    justifyContent:'center',
    alignItems:'center'
  },    
  playerStatus: {
    width: 200,
    height: 130,
    backgroundColor: "white",
    marginLeft: 10,
    marginRight: 10,
  },
  itemImage:{
      flex:1
  }
  
});

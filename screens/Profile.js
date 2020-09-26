import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../assets/Colors";
import { useSelector } from "react-redux";
import ItemDetails from "../components/ItemDetails";
import { LinearGradient } from "expo-linear-gradient";

const Profile = (props) => {
  const fetchPlayer = useSelector((state) => state.user.player);
  const [player, setPlayer] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [clickedThing, setClickedThing] = useState();

  useEffect(() => {
    setPlayer(fetchPlayer);
    props.navigation.setParams({player:player})
  }, [fetchPlayer]);

  if (!player) {
    return <Text>Trying to fetch Player or Pet... loading</Text>;
  }


  return (
    <LinearGradient colors={["transparent", "rgba(0,0,0,0.9)"]}
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 150,
    }} style={styles.profileContainer}>
      <ScrollView style={styles.scrollView}>
        {/* Top Section */}
        <View style={styles.topSection}>
          {/* Picture & Status message */}
          <View>
            <Image
              style={styles.profilePicture}
              source={{
                uri: player.image,
              }}
            />
          </View>
          {/* Profile details */}
          <View style={styles.profileDetails}>
            <Text style={styles.gamingFontBig}>{player.nickname}</Text>
            <Text style={styles.gamingFontNormal}>Level: {player.level}</Text>
            <Text style={styles.gamingFontNormal}>Experience: {player.experience}</Text>
            <Text style={styles.gamingFontNormal}>Gold: {player.gold}</Text>
          </View>
        </View>

        {/* Middle Section */}
        <View style={styles.midSection}>
          {/* Weapon */}
          <TouchableOpacity
            style={styles.weapon}
            onPress={() => {
              setClickedThing(player.equipedItems.weapon);
              setModalVisible(true);
            }}
          >
            <Image
              style={styles.itemImage}
              key={player.equipedItems.weapon.id}
              source={{ uri: player.equipedItems.weapon.image }}
            />
          </TouchableOpacity>

          {/* Armor */}
          <TouchableOpacity
            style={styles.armor}
            onPress={() => {
              setClickedThing(player.equipedItems.armor);
              setModalVisible(true);
            }}
          >
            <Image
              style={styles.itemImage}
              key={player.equipedItems.armor.id}
              source={{ uri: player.equipedItems.armor.image }}
            />
          </TouchableOpacity>

          {/* Shield */}
          <TouchableOpacity
            style={styles.shield}
            onPress={() => {
              setClickedThing(player.equipedItems.shield);
              setModalVisible(true);
            }}
          >
            <Image
              style={styles.itemImage}
              key={player.equipedItems.shield.id}
              source={{ uri: player.equipedItems.shield.image }}
            />
          </TouchableOpacity>
        </View>

        {/* BottomSection */}
        <View style={styles.bottomSection}>
          {/* pet */}
          <TouchableOpacity
            style={styles.pet}
            onPress={() => {
              setClickedThing(player.pet);
              setModalVisible(true);
            }}
          >
            <Image style={styles.petPicture} key={player.pet.id} source={{ uri: player.pet.image }} />
            <View style={styles.petName}>
              <Text style={styles.petName}>{player.pet.name}</Text>
            </View>
          </TouchableOpacity>

          {/* playerStatus */}
          <View style={styles.playerStatus}>
            <Text style={styles.gamingFontBig}>PLAYER SUMMARY</Text>
            <Text style={styles.gamingFontNormal}>Attack: {player.attack}</Text>
            <Text style={styles.gamingFontNormal}>Deffense: {player.deffense}</Text>
            <Text style={styles.gamingFontNormal}>Health Points: {player.hp}</Text>
            <Text style={styles.gamingFontNormal}>Critical: {player.crit}%</Text>
            <Text style={styles.gamingFontNormal}>Block: {player.block}%</Text>
            <Text style={styles.gamingFontNormal}>Mana: {player.hourMana} per hour</Text>
          </View>
        </View>
      </ScrollView>

      {/* MODAL FOR ITEM OR PET */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <ItemDetails
                clickedThing={clickedThing}
                style={styles.modalText}
                fontColor={Colors.secondaryFont}
              ></ItemDetails>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "rgb(235, 108, 108)" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
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
          iconName={Platform.OS === "android" ? "help-circle" : "ios-help-circle"}
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
    borderRadius:8
  },
  topSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal:'10%'
  },
  profileDetails: {
    marginLeft: 50,
    marginBottom: 20,
    justifyContent: "center",
    alignItems:'flex-start',
    minWidth: 100,
  },
  midSection: {
    marginTop: 35,
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
    borderRadius:5
  },
  armor: {
    width: 120,
    height: 200,
    backgroundColor: "white",
    marginLeft: 10,
    marginRight: 10,
    borderRadius:5
  },
  shield: {
    width: 100,
    height: 150,
    backgroundColor: "white",
    borderRadius:5
  },
  bottomSection: {
    marginTop: 40,
    paddingHorizontal:'5%',
    flex: 1,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pet: {
    width: 85,
    height: 102,
    backgroundColor: "black",
    marginLeft:'10%',
    borderRadius:5
  },
  petPicture: {
    width: 85,
    height: 85,
    borderRadius:5
  },
  petName: {
    justifyContent: "center",
    alignItems: "center",
    color:'orange',
    fontFamily: "Gaming",
  },
  playerStatus: {
    width: 200,
    height: 130,
    marginLeft: '10%',
    marginRight: 10,
  },
  itemImage: {
    flex: 1,
    borderRadius:5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "rgb(29,23,25)",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 10,
    marginTop:10,
    padding: 5,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  gamingFontNormal:{
    color:Colors.primaryFont,
    fontFamily: "Gaming",
    fontSize:16,
    letterSpacing:1
  },
  gamingFontBig:{
    color:Colors.primaryFont,
    fontFamily: "Gaming",
    fontSize:20,
    color:"orange"
  }
});

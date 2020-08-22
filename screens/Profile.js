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
    <View style={styles.profileContainer}>
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
            <Text style={{color:Colors.primaryFont}}>{player.profileStatus}</Text>
          </View>
          {/* Profile details */}
          <View style={styles.profileDetails}>
            <Text style={{color:Colors.primaryFont}}>{player.nickname}</Text>
            <Text style={{color:Colors.primaryFont}}>Level: {player.level}</Text>
            <Text style={{color:Colors.primaryFont}}>Experience: {player.experience}</Text>
            <Text style={{color:Colors.primaryFont}}>Gold: {player.gold}</Text>
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
              <Text>Pet: {player.pet.name}</Text>
            </View>
          </TouchableOpacity>

          {/* playerStatus */}
          <View style={styles.playerStatus}>
            <Text style={{color:Colors.primaryFont}}>PLAYER SUMMARY</Text>
            <Text style={{color:Colors.primaryFont}}>Attack: {player.attack}</Text>
            <Text style={{color:Colors.primaryFont}}>Deffense: {player.deffense}</Text>
            <Text style={{color:Colors.primaryFont}}>Health Points: {player.hp}</Text>
            <Text style={{color:Colors.primaryFont}}>Critical: {player.crit}%</Text>
            <Text style={{color:Colors.primaryFont}}>Block: {player.block}%</Text>
            <Text style={{color:Colors.primaryFont}}>Mana: {player.hourMana} per hour</Text>
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
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
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
    minWidth: 170,
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
  bottomSection: {
    marginTop: 40,
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
  petPicture: {
    width: 130,
    height: 110,
  },
  petName: {
    justifyContent: "center",
    alignItems: "center",
  },
  playerStatus: {
    width: 200,
    height: 130,
    marginLeft: 10,
    marginRight: 10,
  },
  itemImage: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
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
    borderRadius: 20,
    padding: 10,
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
});

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
} from "react-native";
import Colors from "../assets/Colors";
import { useSelector } from "react-redux";


const MyModal = ({
  heading,
  buttonText,
  actionHandler,
  clickedThing,
  modalVisible,
  setModalVisible,
  modalType,
}) => {
  let upgradeCost;
  let upgradeUpd;
  if (modalType == "upgrade") {
    switch (clickedThing.upgrade) {
      case 0:
        upgradeCost = clickedThing.level * 50;
        upgradeUpd = "10%";
        break;
      case 1:
        upgradeCost = clickedThing.level * 75;
        upgradeUpd = "15%";
        break;
      case 2:
        upgradeCost = clickedThing.level * 100;
        upgradeUpd = "20%";
        break;
      case 3:
        upgradeCost = "unknown amount of";
        upgradeUpd = "This is MAX Tier";
      default:
        break;
    }
  }

  //dynamic action button
  const dynamicActionButton = () => {
    if (modalType != "upgrade") {
      return (
        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "#d9534f" }}
          onPress={() => {
            actionHandler(clickedThing);
          }}
        >
          <Text style={styles.textStyle}>{buttonText}</Text>
        </TouchableHighlight>
      );
    }

    //if modal
    const fetchPlayer = useSelector((state) => state.user.player);
    let upgradeAllowed = true;
    if (fetchPlayer.gold < upgradeCost) {
      upgradeAllowed = true;
    }

    return (
      <TouchableHighlight
        style={{ ...styles.openButton, backgroundColor: "#d9534f" }}
        onPress={() => {
          if (!upgradeAllowed) {
            console.log("not enough gold for upgrade");
          } else {
            actionHandler(clickedThing);
          }
        }}
      >
        <Text style={styles.textStyle}>
          {upgradeAllowed ? buttonText : "Not enough gold"}
        </Text>
      </TouchableHighlight>
    );
  };

  return (
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
          <Text>{heading}</Text>
          {modalType == "upgrade" && (
            <View>
              <Text>{`Current Tier ${clickedThing.upgrade} / 3`}</Text>
              <Text>{`Next tier: +${upgradeUpd} attributes`}</Text>
              <Text>{`Upgrade cost ${upgradeCost} gold.`}</Text>
            </View>
          )}

          <View style={styles.actionButtons}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
            {dynamicActionButton()}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default MyModal;

const styles = StyleSheet.create({
  inventoryContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  itemFrame: {
    margin: 20,
    padding: 5,
  },
  buttonActions: {
    flexDirection: "row",
  },
  flatList: {
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
    marginHorizontal: 5,
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
  actionButtons: {
    flexDirection: "row",
    margin: 10,
  },
});

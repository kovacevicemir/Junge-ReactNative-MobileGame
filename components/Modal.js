import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableHighlight,
} from "react-native";
import Colors from "../assets/Colors";


const MyModal = ({heading,buttonText,actionHandler,clickedThing, modalVisible, setModalVisible}) => {
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
          <View style={styles.actionButtons}>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#d9534f" }}
              onPress={() => {
                actionHandler(clickedThing);
              }}
            >
              <Text style={styles.textStyle}>{buttonText}</Text>
            </TouchableHighlight>
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
      marginHorizontal:5
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
    actionButtons:{
      flexDirection:'row',
      margin:10
    }
  });

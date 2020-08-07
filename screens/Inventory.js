import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  FlatList,
  Button,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableHighlight,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../assets/Colors";
import { useSelector, useDispatch } from "react-redux";
import ItemDetails from "../components/ItemDetails";
import * as UserActions from "../store/actions/user";

const Inventory = (props) => {
  const fetchInventory = useSelector((state) => state.user.inventory);
  const [inventory, setInventory] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [clickedThing, setClickedThing] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    setInventory(fetchInventory);
  }, [fetchInventory]);

  const EquipItemHandler = (item) => {
    dispatch(UserActions.equip(item));
  };

  const DeleteItemHandler = (item) => {
    //call delete action
    dispatch(UserActions.deleteItem(item));

    //modal
    setModalVisible(false);
  };

  return (
    <View style={styles.inventoryContainer}>
      {inventory ? (
        <FlatList
          data={inventory.items}
          style={styles.flatList}
          renderItem={(itemData) => (
            <View style={styles.itemFrame}>
              <ItemDetails
                clickedThing={itemData.item}
                fontColor={Colors.primaryFont}
              />
              <View style={styles.buttonActions}>
                <Button
                  title="Equip"
                  onPress={() => EquipItemHandler(itemData.item)}
                />
                <Button
                  title="Delete"
                  onPress={() => {
                    setClickedThing(itemData.item)
                    setModalVisible(true)
                  }}
                />
              </View>
            </View>
          )}
        ></FlatList>
      ) : (
        <Text>Loading inventory...</Text>
      )}

      {/* MODAL FOR ITEM OR PET */}
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
            <Text>Deleting item</Text>
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
                DeleteItemHandler(clickedThing)
              }}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
            </View>
            
          </View>
        </View>
      </Modal>
    </View>
  );
};

Inventory.navigationOptions = (navData) => {
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

export default Inventory;

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

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
  TouchableHighlight,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import Colors from "../assets/Colors";
import { useSelector, useDispatch } from "react-redux";
import ItemDetails from "../components/ItemDetails";
import * as UserActions from "../store/actions/user";
import Modal from "../components/Modal";

const Inventory = (props) => {
  const fetchInventory = useSelector((state) => state.user.inventory);
  const [inventory, setInventory] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [clickedThing, setClickedThing] = useState({});

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

  const SellItemHandler = (item) => {
    //call delete action
    dispatch(UserActions.sellItem(item));

    //modal
    setModalVisible1(false);
  };

  const UpgradeItemHandler = (item) => {
    //call delete action
    dispatch(UserActions.sellItem(item));

    //modal
    setModalVisible1(false);
  };

  return (
    <View style={styles.inventoryContainer}>
      {inventory ? (
        <FlatList
          data={inventory.items}
          style={styles.flatList}
          renderItem={(itemData) => (
            <TouchableOpacity
              style={styles.itemFrame}
              onPress={() => {
                setClickedThing(itemData.item);
                setModalVisible2(true);
              }}
            >
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
                    setClickedThing(itemData.item);
                    setModalVisible(true);
                  }}
                />
                <Button
                  title="Sell"
                  onPress={() => {
                    setClickedThing(itemData.item);
                    setModalVisible1(true);
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
        ></FlatList>
      ) : (
        <Text>Loading inventory...</Text>
      )}

      {/* MODAL FOR ITEM OR PET */}
      <Modal
        heading="Delete item"
        buttonText="Delete"
        actionHandler={DeleteItemHandler}
        clickedThing={clickedThing}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Modal
        heading="Sell item ?"
        buttonText="Sell"
        actionHandler={SellItemHandler}
        clickedThing={clickedThing}
        modalVisible={modalVisible1}
        setModalVisible={setModalVisible2}
      />
      <Modal
        heading="Upgrade item ?"
        buttonText="Upgrade"
        actionHandler={SellItemHandler}
        clickedThing={clickedThing}
        modalVisible={modalVisible2}
        setModalVisible={setModalVisible2}
      />
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

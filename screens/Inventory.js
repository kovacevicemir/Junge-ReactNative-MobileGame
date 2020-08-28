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
    dispatch(UserActions.upgradeItem(item));

    //modal
    setModalVisible1(false);
  };

  const ItemUpgradesComponent = (item) => {
    let something = new Array();
    for(let i = 0; i < item.upgrade; i++){
        something.push(<Image style={styles.tiersIconImage} source={{uri:Colors.ItemTiers[i]}} />)
    }

    console.log(something)
    return something
  }



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

                //check if its item, pet cannot be upgraded!
                if(!itemData.item.exp){
                  setModalVisible2(true);
                }

              }}
            >
              <ItemDetails
                clickedThing={itemData.item}
                fontColor={Colors.primaryFont}
              />
              <View style={styles.buttonActions}>
                <TouchableOpacity
                  textStyle={{fontFamily:"Gaming"}}
                  onPress={() => EquipItemHandler(itemData.item)}
                >
                  <Text style={styles.equipButton}>Equip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setClickedThing(itemData.item);
                    setModalVisible(true);
                  }}
                >
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setClickedThing(itemData.item);
                    setModalVisible1(true);
                  }}
                >
                    <Text style={styles.sellButton}>Sell</Text>
                </TouchableOpacity>
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
        setModalVisible={setModalVisible1}
      />
      <Modal
        heading="Upgrade item ?"
        buttonText="Upgrade"
        modalType="upgrade"
        actionHandler={UpgradeItemHandler}
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
          iconName={Platform.OS === "android" ? "help-circle" : "ios-help-circle"}
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
    justifyContent:'space-between',
    marginTop:5
  },
  flatList: {
    flex: 1,
    backgroundColor:'rgb(29,23,25)',
    paddingHorizontal:25
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
  equipButton:{
    fontFamily:"Gaming",
    fontSize:18,
    color:'green',
    borderColor:'green',
    borderWidth:1,
    padding:5
  },
  deleteButton:{
    fontFamily:"Gaming",
    fontSize:18,
    color:'red',
    borderColor:'red',
    borderWidth:1,
    padding:5
  },
  sellButton:{
    fontFamily:"Gaming",
    fontSize:18,
    color:'orange',
    borderColor:'orange',
    borderWidth:1,
    padding:5
  }
});

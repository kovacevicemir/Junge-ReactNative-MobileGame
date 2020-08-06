import React, { useState, useEffect} from "react";
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
import * as UserActions from "../store/actions/user"

const Inventory = (props) => {
  const fetchInventory = useSelector((state) => state.user.inventory);
  const [inventory, setInventory] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    setInventory(fetchInventory);
  }, [fetchInventory]);

  const EquipItemHandler =(item) =>{
    //Remove from state
    dispatch(UserActions.equip(item))
  }

  return (
    <View style={styles.inventoryContainer}>
      {inventory ? (
        <FlatList
          data={inventory.items}
          renderItem={(itemData) => (
            <View style={styles.itemFrame}>
              <ItemDetails clickedThing={itemData.item} fontColor={Colors.primaryFont} />
              <View style={styles.buttonActions}>
                  <Button title='Equip' onPress={() => EquipItemHandler(itemData.item)} />
                  <Button title='Delete' />
              </View>
            </View>
          )}
        ></FlatList>
      ) : (
        <Text>Loading inventory...</Text>
      )}
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
  itemFrame:{
    marginVertical:20,
    padding:5
  },
  buttonActions:{
    flexDirection:'row'
  }
});

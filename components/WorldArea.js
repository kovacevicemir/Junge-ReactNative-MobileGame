import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  Image,
  FlatList,
} from "react-native";
import Colors from "../assets/Colors";

const WorldArea = (props) => {
  const { world, randomMonsters } = props;
  console.log("worldArea.js random mobs :", randomMonsters[0].id);

  // useEffect(()=>{
  //     setTest(monsters)
  // },[monsters])

//   const renderMonsters = randomMonsters.map((mob, index) => {
//     return (
//       <View style={styles.mobContainer} key={index}>
//         <Image
//           style={styles.mobImage}
//           alt={mob.id}
//           source={{ uri: mob.image }}
//         />
//         <View style={styles.mobInfo}>
//           <Button color="#fff" title={`${mob.name} LVL${mob.level}`} />
//           <Text style={{ color: "white" }}>Level: {mob.level}</Text>
//         </View>
//       </View>
//     );
//   });

  const Mobbb = (props) => {
    const { mob } = props;
    return (
      <View style={styles.mobContainer}>
        <Image
          style={styles.mobImage}
          alt={mob.id}
          source={{ uri: mob.image }}
        />
        <View style={styles.mobInfo}>
          <Button color="#fff" title={`${mob.name} LVL${mob.level}`} />
          <Text style={{ color: "white" }}>Level: {mob.level}</Text>
        </View>
      </View>
    );
  };



  return (
    <View style={styles.areaContainer}>
      <View style={styles.areaBottom}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={randomMonsters}
          renderItem={(itemData) => <Mobbb mob={itemData.item} />}
          style={{ flex:1 }}
        />
      </View>
    </View>
  );
};

export default WorldArea;

const styles = StyleSheet.create({
  areaContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Colors.background,
  },
  areaBottom: {
    
    padding: 15,
    backgroundColor: Colors.background,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  worldTitle: {
    fontSize: 16,
    color: Colors.primaryFont,
  },
  mobImage: {
    width: 40,
    height: 40,
  },
  mobContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin:20,
  },
  mobInfo: {
    justifyContent: "center",
    alignItems: "center",
  },
});

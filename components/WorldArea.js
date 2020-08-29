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
import { useDispatch } from "react-redux";
import * as WorldActions from "../store/actions/world";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const WorldArea = (props) => {
  const { randomMonsters, fetching, player, fight, world } = props;

  const dispatch = useDispatch();

  const [mobs, setMobs] = useState();
  const [isFight, setIsFight] = useState(false);

  // console.log('----------------------')
  // console.log('randomMonsters: ',randomMonsters.length)

  useEffect(() => {
    setMobs(randomMonsters);
  }, [randomMonsters, fetching]);

  useEffect(() => {
    fight ? setIsFight(true) : setIsFight(false);
  }, [fight]);

  const attackMonster = (mob, player, index) => {
    setIsFight(true);
    dispatch(WorldActions.attackMob(mob, player, world.levelRange));

    //delete mob
    let newMobs;
    newMobs = [...mobs];
    newMobs.splice(index, 1);
    setMobs(newMobs);
  };

  const Mobbb = (props) => {
    const { mob, index } = props;

    return (
      <View style={styles.mobContainer}>
        <Image
          style={styles.mobImage}
          alt={mob.id}
          source={{ uri: mob.image }}
        />
        <View style={styles.mobInfo}>
          <TouchableOpacity
            color="#fff"
            title={mob.name}
            onPress={() => attackMonster(mob, player, index)}
          >
            <Text style={styles.gamingFontNormal}>{mob.name}</Text>
          </TouchableOpacity>
          <Text style={{ color: "white" }}>Level: {mob.level}</Text>
        </View>
      </View>
    );
  };

  if (fetching) {
    return (
      <View style={styles.areaContainer}>
        <LinearGradient style={styles.areaBottom}
        colors={["rgba(0,0,0,0.9)", "transparent"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
          zIndex: 5,
          justifyContent:"center",
          alignItems:'center'
        }}>
          <Text style={styles.searchingText}>Searching area...</Text>
        </LinearGradient>
      </View>
    );
  }

  if (isFight) {
    return (
      <View style={styles.areaContainer}>
        <LinearGradient style={styles.areaBottom}
        colors={["rgba(0,0,0,0.9)", "transparent"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
          zIndex: 5,
          justifyContent:"center",
          alignItems:'center'
        }}>
          <Text style={styles.searchingText}>Fighting...</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <View style={styles.areaContainer}>
      <LinearGradient
        style={styles.areaBottom}
        colors={["rgba(0,0,0,0.9)", "transparent"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
          zIndex: 5,
        }}
      >
        {mobs ? (
          <View style={styles.testt}>
            {mobs.length == 0 && (
              <View style={styles.swipeMessageContainer}>
                <Text style={styles.gamingFontBig}>
                  Swipe right on picture to explore area...
                </Text>
                <Text style={styles.gamingFontBig}>
                  Swipe left to change world area...
                </Text>
              </View>
            )}

            <FlatList
              keyExtractor={(item, index) => index.toString()}
              data={mobs}
              renderItem={(itemData) => (
                <Mobbb mob={itemData.item} index={itemData.index} />
              )}
              style={{ flex: 1 }}
            />
          </View>
        ) : (
          <View style={styles.swipeMessageContainer}>
            <Text style={styles.searchingText}>
              Swipe right on picture to explore area...
            </Text>
            <Text style={styles.searchingText}>
              Swipe left to change world area...
            </Text>
          </View>
        )}
      </LinearGradient>
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
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },

  mobImage: {
    width: 40,
    height: 40,
    borderRadius: 3,
    marginRight: 5,
  },
  mobContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    borderRadius: 5,
    borderColor: "red",
    borderWidth: 1,
    padding: 5,
    
  },
  testt:{
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 300,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mobInfo: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchingText: {
    color: Colors.primaryFont,
    fontSize: 22,
    marginTop: 25,
    fontFamily:"Gaming",
    letterSpacing:3
    
  },
  gamingFontNormal: {
    color: Colors.primaryFont,
    fontFamily: "Gaming",
    fontSize: 16,
  },
  gamingFontBig: {
    color: Colors.primaryFont,
    fontFamily: "Gaming",
    fontSize: 20,
  },
  swipeMessageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

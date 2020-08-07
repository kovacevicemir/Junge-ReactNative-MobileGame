import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Platform, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import WorldArea from "../components/WorldArea"
import {getRandomMobs} from "../helpers/getRandomMobs"
import HeaderButton from "../components/HeaderButton";
import Colors from "../assets/Colors";
import { useSelector } from "react-redux";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const World = (props) => {
  const fetchPlayer = useSelector((state) => state.user.player);
  const fetchWorlds = useSelector((state) => state.world.worlds);
  const [player, setPlayer] = useState();
  const [worlds, setWorlds] = useState();
  const [world, setWorld] = useState();
  const [randomMonsters, setRandomMonsters] = useState()


  useEffect(() => {
    setPlayer(fetchPlayer);
    props.navigation.setParams({ player: player });
  }, [fetchPlayer]);

  useEffect(() => {
    setWorlds(fetchWorlds);
    
  }, []);

  useEffect(()=>{
    if(world){
      setRandomMonsters(getRandomMobs(world.monsters,world.boss))
    }
  },[])

  //on swipe
  const onSwipe =(gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    switch (gestureName) {
      case SWIPE_UP:
        console.log('swipe up')
        break;
      case SWIPE_DOWN:
        console.log('swipe down')
        break;
      case SWIPE_LEFT:
        setWorld(null)
        break;
      case SWIPE_RIGHT:
        console.log('SWIPE ->>>')
        setRandomMonsters(getRandomMobs(world.monsters,world.boss))
        break;
    }
  }

  if (!worlds) {
    return <Text>Fetching worlds...</Text>;
  }

  if(world && randomMonsters){
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
        onSwipe={(direction, state) => onSwipe(direction, state)}
        style={{flex:1, width:'100%', backgroundColor:'red'}}
        config={config}
      >
        {/* World Area */}
          <WorldArea world={world} randomMonsters={randomMonsters} />
        {/* World Area end */}
      </GestureRecognizer>
    )
  }

  // new World('w1','Mystic Forest','1-10',[mobs[0],mobs[1]],mobs[3])
  const renderWorlds = worlds.map((world) => {
    return (
      <Button
        key={world.id}
        title={`${world.name} (${world.levelRange}) LVL`}
        onPress={() => {
          setWorld(world)
          setRandomMonsters(getRandomMobs(world.monsters,world.boss))
        }}
      />
    );
  });

  return (
    <View style={styles.worldContainer}>
      <Text>WORLD</Text>
      {renderWorlds}
    </View>
  );
};

World.navigationOptions = (navData) => {
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
export default World;

const styles = StyleSheet.create({
  worldContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

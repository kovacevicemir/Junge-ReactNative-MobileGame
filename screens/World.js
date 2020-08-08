import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Button,
  ImageBackground,
  Image
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import WorldArea from "../components/WorldArea";
import { getRandomMobs } from "../helpers/getRandomMobs";
import HeaderButton from "../components/HeaderButton";
import Colors from "../assets/Colors";
import { useSelector } from "react-redux";
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";

const World = (props) => {
  const fetchPlayer = useSelector((state) => state.user.player);
  const fetchWorlds = useSelector((state) => state.world.worlds);
  const fetchFight = useSelector((state) => state.world.fight);
  const [player, setPlayer] = useState();
  const [worlds, setWorlds] = useState();
  const [world, setWorld] = useState();
  const [randomMonsters, setRandomMonsters] = useState();
  const [generatingMobs, setGeneratingMobs] = useState(false);
  const [fight, setFight] = useState();

  useEffect(() => {
    setPlayer(fetchPlayer);
    props.navigation.setParams({ player: player });
  }, [fetchPlayer]);

  useEffect(() => {
    setWorlds(fetchWorlds);
  }, []);

  useEffect(() => {
    setFight(fetchFight);
  }, [fetchFight]);

  useEffect(() => {
    if (world) {
      setRandomMonsters(getRandomMobs(world.monsters, world.boss));
      setGeneratingMobs(false);
    }
  }, []);

  //on swipe
  const onSwipe = (gestureName, gestureState) => {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        setWorld(null);
        break;
      case SWIPE_RIGHT:
        console.log("SWIPE ->>>");
        setGeneratingMobs(true);
        setTimeout(() => {
          setGeneratingMobs(false);
        }, 2000);
        setRandomMonsters(getRandomMobs(world.monsters, world.boss));
        break;
    }
  };

  if (!worlds) {
    return <Text>Fetching worlds...</Text>;
  }

  const RenderFight = () => {
    if (fight) {
      return (
          <View style={styles.fightLogContainer}>
            <View style={{flexDirection:'row'}}>
              <View style={styles.fightPlayerContainer}>
                <Text style={{color:Colors.primaryFont}}>{player.nickname}</Text>
                <Image source={{uri:player.image}} style={styles.playerImage} />
              </View>
              <View style={styles.fightMobContainer}>
                <Text style={{color:Colors.primaryFont}}>{fight.mob.name}</Text>
                <Image source={{uri:fight.mob.image}} style={styles.playerImage} />
              </View>
            </View>
            <Button title='ok' onPress={() => setFight(null)} />
          </View>
      );
    } else {
      return <Text>Start fighting bitch!</Text>;
    }
  };

  if (world && randomMonsters) {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
      detectSwipeDown: false,
      detectSwipeUp: false,
    };

    return (
      <View style={{ flex: 1 }}>
        <GestureRecognizer
          onSwipe={(direction, state) => onSwipe(direction, state)}
          style={{ flex: 1, width: "100%", backgroundColor: Colors.background }}
          config={config}
        >
          {/* Top */}
          <View style={{ flex: 1 }}>
            <View style={styles.areaTop}>
              <Text style={styles.worldTitle}>{world.name}</Text>
              <ImageBackground
                source={{ uri: world.image }}
                style={styles.backgroundImage}
              >
                {fight && <RenderFight />}

              </ImageBackground>
            </View>
          </View>
          {/* Top end */}
        </GestureRecognizer>

        {/* World Area */}
        <WorldArea
          world={world}
          randomMonsters={randomMonsters}
          player={player}
          fetching={generatingMobs}
          fight={fight}
        />
        {/* World Area end */}
      </View>
    );
  }

  // new World('w1','Mystic Forest','1-10',[mobs[0],mobs[1]],mobs[3])
  const renderWorlds = worlds.map((world) => {
    return (
      <Button
        key={world.id}
        title={`${world.name} (${world.levelRange}) LVL`}
        onPress={() => {
          setWorld(world);
          setRandomMonsters(getRandomMobs(world.monsters, world.boss));
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
  areaTop: {
    height: "50%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  worldTitle: {
    fontSize: 16,
    color: Colors.primaryFont,
  },
  fightLogContainer: {
    backgroundColor: "rgba(0,0,0,0.75)",
    width: "75%",
    height: "75%",
    alignItems:'center',
    justifyContent:'space-evenly',
    paddingBottom:'15%'
  },
  playerImage:{
    width:100,
    height:100
  },
  fightPlayerContainer:{
    justifyContent:'center',
    alignItems:'center',
    margin:10
  },
  fightMobContainer:{
    justifyContent:'center',
    alignItems:'center',
    margin:10
  }
});

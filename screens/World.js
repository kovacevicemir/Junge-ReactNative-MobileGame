import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Button,
  ImageBackground,
  Image,
  Alert 
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import WorldArea from "../components/WorldArea";
import { getRandomMobs } from "../helpers/getRandomMobs";
import HeaderButton from "../components/HeaderButton";
import Colors from "../assets/Colors";
import { useSelector, useDispatch } from "react-redux";
import * as UserActions from '../store/actions/user'
import * as WorldActions from '../store/actions/world'
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures";
import * as Progress from "react-native-progress";


const World = (props) => {

  const dispatch = useDispatch()

  //global message
  const fetchGlobalMessage = useSelector((state) => state.user.globalMessage)
  const [message, setMessage] = useState()

  useEffect(()=>{
    if(fetchGlobalMessage){
      Alert.alert(
        "LEVEL UP!",
        fetchGlobalMessage,
        [
          {
            text: "OK",
            onPress: () => dispatch(UserActions.removeGlobalMessage()),
            style: "cancel"
          },
        ],
        { cancelable: false }
      );
    }
  },[fetchGlobalMessage])
  //



 

  //Get player data, worlds data, and fight
  //If fight is null -> battle log and fight is not rendered.
  const fetchPlayer = useSelector((state) => state.user.player);
  const fetchWorlds = useSelector((state) => state.world.worlds);
  const fetchFight = useSelector((state) => state.world.fight);

  const [player, setPlayer] = useState();

  //Get list of worlds and world data when enter World.js screen
  const [worlds, setWorlds] = useState();

  //Get practicular world and world data on when user click on one of the world
  const [world, setWorld] = useState();

  //storing random list of mobs or boss from  this world. (get random on enter world, and on swipe right)
  const [randomMonsters, setRandomMonsters] = useState();

  //Searching area... in mobs section if true, if false show list of mobs
  const [generatingMobs, setGeneratingMobs] = useState(false);

  //show fight log and battle
  const [fight, setFight] = useState();

  //+1 index every second if attacked, fightLog..[index]
  const [fightLogIndex, setFightLogIndex] = useState(0);

  //if null remove stop interval +1 index, and clear fightLog
  const [fightResult, setFightResult] = useState()

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
      //Problem: when kill mobs it does not show monsters on swipe right array is empty in world. how ?
      setRandomMonsters(getRandomMobs(world.monsters, world.boss));
      setGeneratingMobs(false);
    }
  }, []);


  const createThreeButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  //on swipe
  const onSwipe = (gestureName, gestureState) => {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
    switch (gestureName) {
      case SWIPE_LEFT:
        setWorld(null);
        break;
      case SWIPE_RIGHT:

        //Check if player have enough mana
        if(player.mana < world.manaMultiplier){
          Alert.alert(
            "You dont have enough mana!",
            "You cannot explore area because you run out of mana. Your mana regenerates every hour, please come back later.",
            [
              {
                text: "OK",
                onPress: () => dispatch(UserActions.removeGlobalMessage()),
                style: "cancel"
              },
            ],
            { cancelable: false }
          );

          break;
        }

        setGeneratingMobs(true);

        //reduce mana
        dispatch(UserActions.reduceMana(world.manaMultiplier))

        let newMobs = getRandomMobs(world.monsters, world.boss)
        setRandomMonsters(newMobs);

        const timeout1 = setTimeout(() => {
          setGeneratingMobs(false);
          clearTimeout(timeout1)
        }, 1000);
        
        break;
    }
  };

  if (!worlds) {
    return <Text>Fetching worlds...</Text>;
  }

  const RenderFight = () => {
    if (fight) {

      let timeout = setInterval(() => {
        setFightLogIndex(fightLogIndex + 1);
      }, 700);

      useEffect(()=>{
        return () =>{
          clearInterval(timeout)
        }
      },[fightLogIndex])
      

      let progressPlayer = parseFloat((fight.fightLog.playerHp[fightLogIndex] / player.hp).toFixed(2));
      let progressMob = parseFloat((fight.fightLog.monsterHp[fightLogIndex] / fight.mob.hp).toFixed(2));
      let playerAtt = fight.fightLog.playerAttacks[fightLogIndex];
      let mobAtt = fight.fightLog.monsterAttacks[fightLogIndex];

      if(isNaN(mobAtt) && isNaN(playerAtt) && isNaN(progressMob) && isNaN(progressPlayer)){
        clearInterval(timeout)
        setFightResult(fight.win)
      }
      
      if(progressPlayer == undefined || isNaN(progressPlayer)){
        const lastValue = fight.fightLog.playerHp.length -1
        progressPlayer = parseFloat((fight.fightLog.playerHp[lastValue] / player.hp).toFixed(2));
      } 
      
      if(progressMob == undefined || isNaN(progressMob)){
        const lastValue = fight.fightLog.monsterHp.length-1
        progressMob = parseFloat((fight.fightLog.monsterHp[lastValue] / fight.mob.hp).toFixed(2));
      } 
      
      if(playerAtt == undefined || isNaN(playerAtt)){
        const lastValue = fight.fightLog.playerAttacks.length -1
        playerAtt = fight.fightLog.playerAttacks[lastValue];
      }

      
      if(mobAtt == undefined || isNaN(mobAtt)){
        const lastValue = fight.fightLog.monsterAttacks.length -1
        mobAtt = fight.fightLog.monsterAttacks[lastValue];
      }

      

      return (
        <View style={styles.fightLogContainer}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.fightPlayerContainer}>
              <Text style={{ color: Colors.primaryFont }}>
                {player.nickname}
              </Text>
              <Image
                source={{ uri: player.image }}
                style={styles.playerImage}
              />
              
              <Progress.Bar progress={progressPlayer} color="green" width={100} />
              <Text style={mobAtt === 'Block!' ? styles.monsterAttackBlock : styles.monsterAttackText}>
                {mobAtt}
              </Text>
            </View>
            <View style={styles.fightMobContainer}>
              <Text style={{ color: Colors.primaryFont }}>
                {fight.mob.name}
              </Text>
              <Image
                source={{ uri: fight.mob.image }}
                style={styles.playerImage}
              />
              
              <Progress.Bar progress={progressMob} color="green" width={100} />
              <Text style={playerAtt > 0 ? styles.playerAttackText : styles.playerAttackCrit}>
                {playerAtt > 0 ? playerAtt : `${playerAtt *-1}!`}
              </Text>
            </View>
          </View>
          {
          fightResult === 'win' ? 
          (
            <View style={styles.fightResultStyle}>
              <Text style={styles.battleResultFont}>exp: {fight.mob.exp}</Text>
              <Text style={styles.battleResultFont}>gold: {fight.mob.gold}</Text>
              {fight.drop &&
              <Text style={styles.battleResultFont}>drop: <Text style={{color:'orange'}}>{fight.drop.name}</Text></Text> }
            </View>
          )
          :
          <View style={styles.fightResultStyle}>
            {fightResult === 'lost' && <Text>You have lost the battle!</Text>}
          </View> 
          } 
          <Button 
          title="ok" 
          onPress={() => {
            setFightLogIndex(0) 
            setFight(null)
            setFightResult(null)
          }} 
          />
        </View>
      );
    } else {
      return <Text>Start fighting...</Text>;
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
          randomMonsters={randomMonsters}
          player={player}
          fetching={generatingMobs}
          fight={fight}
          world={world}
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
          //check if enough mana
          if(player.mana < world.manaMultiplier){
            Alert.alert(
              "You dont have enough mana!",
              "You cannot explore area because you run out of mana. Your mana regenerates every hour, please come back later.",
              [
                {
                  text: "OK",
                  onPress: () => dispatch(UserActions.removeGlobalMessage()),
                  style: "cancel"
                },
              ],
              { cancelable: false }
            );
          }else{
            dispatch(UserActions.reduceMana(world.manaMultiplier))
            setWorld(world);
            setRandomMonsters(getRandomMobs(world.monsters, world.boss));
          }
          
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
  battleResultFont:{
    color:'yellow'
  },
  fightLogContainer: {
    backgroundColor: "rgba(0,0,0,0.75)",
    width: "85%",
    height: "85%",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: "5%",
    borderRadius: 10,
  },
  playerImage: {
    width: 100,
    height: 100,
  },
  fightPlayerContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal:10
  },
  fightMobContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal:10
  },
  monsterAttackText: {
    color: "#ab433c",
  },
  playerAttackText: {
    color: "yellow",
  },
  fightResultStyle:{
    minHeight:50
  },
  playerAttackCrit:{
    color:'red',
    fontWeight:'800'
  },
  monsterAttackBlock:{
    color:'#318fe8',
    fontWeight:'700'
  }
});

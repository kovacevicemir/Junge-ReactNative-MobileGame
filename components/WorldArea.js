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
import {useDispatch} from 'react-redux'
import * as WorldActions from '../store/actions/world'

const WorldArea = (props) => {
  const { world, randomMonsters, fetching, player, fight } = props;

  const dispatch = useDispatch()

  const [mobs, setMobs] = useState();
  const [isFight, setIsFight] = useState(false)

  useEffect(() => {
    setMobs(randomMonsters);
    fight ? setIsFight(true) : setIsFight(false)
  }, [randomMonsters,fight]);

  const attackMonster = (mob,player) =>{
      console.log('attackMonster method: ',player.nickname)
      setIsFight(true)
      console.log(mob.name)
      dispatch(WorldActions.attackMob(mob,player))
      console.log('dispatched!!!')
  }

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
          <Button color="#fff" title={mob.name} onPress={()=> attackMonster(mob,player)} />
          <Text style={{ color: "white" }}>Level: {mob.level}</Text>
        </View>
      </View>
    );
  };

  if (fetching) {
    return (
      <View style={styles.areaContainer}>
        <View style={styles.areaBottom}>
            <Text style={styles.searchingText}>Searching area...</Text>
        </View>
      </View>
    );
  }

  

  if (isFight) {
    return (
      <View style={styles.areaContainer}>
        <View style={styles.areaBottom}>
            <Text style={styles.searchingText}>Fighting...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.areaContainer}>
      <View style={styles.areaBottom}>
        {mobs ? (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={mobs}
            renderItem={(itemData) => <Mobbb mob={itemData.item} />}
            style={{ flex: 1 }}
          />
        ) : (
          <Text>Fetching mobs...</Text>
        )}
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

  mobImage: {
    width: 40,
    height: 40,
  },
  mobContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  mobInfo: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchingText:{
      color:Colors.primaryFont,
      fontSize:16
  }
});

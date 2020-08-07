import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'

const WorldArea = (props) => {
    const {world, randomMonsters} = props
    console.log('worldArea.js random mobs :', randomMonsters[0].id)

    // useEffect(()=>{
    //     setTest(monsters)
    // },[monsters])

    const renderMonsters = randomMonsters.map(mob =>{
        return <Text key={mob.id}>{`${mob.name} - ${mob.level}`}</Text>
    })

    return (
        <View style={styles.areaContainer}>
            <View style={styles.areaTop}>
                <Text>{world.name}</Text>
            </View>
            <View style={styles.areaBottom}>
                {renderMonsters}
            </View>
        </View>
    )
}

export default WorldArea

const styles = StyleSheet.create({
    areaContainer:{
        flex:1,
        width:'100%',
        height:'100%'
    },
    areaTop:{
        height:'50%',
        backgroundColor:'blue',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    areaBottom:{
        height:'50%',
        backgroundColor:'green',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

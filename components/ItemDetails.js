import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

const ItemDetails = (props) => {
    const {clickedThing} = props
    console.log(typeof(clickedThing))

    if(clickedThing.exp){
        // PET
        return (
            <View>
                <Image style={styles.imageContainerPet} source={{uri:clickedThing.image}} />
                <Text>{clickedThing.name}</Text>
                <Text>level:{clickedThing.level}</Text>
                <Text>Exp:{clickedThing.exp}</Text>
                <Text>+Attack:{clickedThing.attack}</Text>
                <Text>+Deffense:{clickedThing.deffense}</Text>
                <Text>+Health Point:{clickedThing.hp}</Text>
                <Text>+Mana per Hour:{clickedThing.mana}</Text>
                <Text>Gold:{clickedThing.gold}</Text>
            </View>
        )

    }

    //ITEM
    return (
        <View>
            <Image style={styles.imageContainer} source={{uri:clickedThing.image}} />
            <Text>{clickedThing.name}</Text>
            <Text>Attack:{clickedThing.attack}</Text>
            <Text>Deffense:{clickedThing.deffense}</Text>
            <Text>Critical:{clickedThing.crit}%</Text>
            <Text>Block:{clickedThing.block}%</Text>
            <Text>level:{clickedThing.level}</Text>
            <Text>Tier:{clickedThing.upgrade}</Text>
            <Text>Gold:{clickedThing.gold}</Text>
        </View>
    )
}

export default ItemDetails

const styles = StyleSheet.create({
    imageContainer:{
        minHeight:200,
        minWidth:150
    },
    imageContainerPet:{
        minHeight:175,
        minWidth:175
    }
})

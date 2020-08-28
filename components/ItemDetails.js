import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native'
import Colors from "../assets/Colors";
import { render } from 'react-dom'

const ItemDetails = (props) => {
    const {clickedThing,fontColor} = props


    if(clickedThing.exp){
        // PET
        return (
            <View>
                <Image style={styles.imageContainerPet} source={{uri:clickedThing.image}} />
                <Text style={{color:fontColor}}>{clickedThing.name}</Text>
                <Text style={{color:fontColor}}>level:{clickedThing.level}</Text>
                <Text style={{color:fontColor}}>Exp:{clickedThing.exp}</Text>
                <Text style={{color:fontColor}}>+Attack:{clickedThing.attack}</Text>
                <Text style={{color:fontColor}}>+Deffense:{clickedThing.deffense}</Text>
                <Text style={{color:fontColor}}>+Health Point:{clickedThing.hp}</Text>
                <Text style={{color:fontColor}}>+Mana per Hour:{clickedThing.mana}</Text>
                <Text style={{color:fontColor}}>Gold:{clickedThing.gold}</Text>
            </View>
        )

    }

    const ItemUpgradesComponent = () => {
        let something = new Array();
        for(let i = 0; i < clickedThing.upgrade; i++){
            something.push(<Image style={styles.tiersIconImage} source={{uri:Colors.ItemTiers[i]}} />)
        }

        console.log(something)
        return something
    }

    //ITEM
    return (
        <View style={styles.itemContainer}>
            <ImageBackground style={styles.imageContainer} source={{uri:clickedThing.image}} />
            <Text style={{color:fontColor}}>{clickedThing.name}</Text>
            <View style={styles.itemUpgrades}>
                <ItemUpgradesComponent />
            </View>
            <Text style={{color:fontColor}}>Attack:{clickedThing.attack}</Text>
            <Text style={{color:fontColor}}>Deffense:{clickedThing.deffense}</Text>
            <Text style={{color:fontColor}}>Critical:{clickedThing.critical}%</Text>
            <Text style={{color:fontColor}}>Block:{clickedThing.block}%</Text>
            <Text style={{color:fontColor}}>level:{clickedThing.level}</Text>
            <Text style={{color:fontColor}}>Tier:{clickedThing.upgrade}</Text>
            <Text style={{color:fontColor}}>Gold:{clickedThing.gold}</Text>
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
    },
    itemUpgrades:{
        display:"flex",
        flexDirection:"row"
    },
    tiersIconImage:{
        minHeight:20,
        minWidth:20
    },
})

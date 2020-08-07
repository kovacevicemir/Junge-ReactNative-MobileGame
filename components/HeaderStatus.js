import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HeaderStatus = (props) => {
    
    return (
        <View>
            <Text>Level {props.player.level}</Text>
            <Text>Exp {props.player.experience}</Text>
            <Text>Gold {props.player.gold}</Text>
            <Text>Mana {props.player.mana}</Text>
        </View>
    )
}

export default HeaderStatus

const styles = StyleSheet.create({})

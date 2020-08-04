import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Authentication = () => {
    return (
        <View style={styles.main}>
            <Text>AUTHENTICATION</Text>
        </View>
    )
}

export default Authentication

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

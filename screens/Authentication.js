import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Authentication = (props) => {
    return (
        <View style={styles.main}>
            <Text>AUTHENTICATION</Text>
        </View>
    )
}

Authentication.navigationOptions = navData =>{
    return {
        headerTitle:'J U N G L E'
    }
}



export default Authentication

const styles = StyleSheet.create({
    main:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})

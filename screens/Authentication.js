import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import * as authActions from "../store/actions/user";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const Authentication = (props) => {

    const [authDone, setAuthDone] = useState(false);


    const fetchPlayer = useSelector((state) => state.user.player);
    const dispatch = useDispatch();


    useEffect(() => {
        if(!authDone){
            if(fetchPlayer){
                console.log('LOOOOGIIIIN')
                setAuthDone(true);
                props.navigation.navigate("Profile");
                
            }
        }
        
    }, [fetchPlayer])


    return (
        <View style={styles.main}>
            <Text>AUTHENTICATION</Text>
            <TouchableOpacity
                onPress={() =>{
                    dispatch(
                        authActions.login({ nickname:"player_one", password:"password" })
                    )
                }}
            >
                <Text>Click to login</Text>
            </TouchableOpacity>
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

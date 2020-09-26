import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import * as authActions from "../store/actions/user";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Authentication = (props) => {
  const [authDone, setAuthDone] = useState(false);
  const [registrationDisplay, setRegistrationDisplay] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const fetchPlayer = useSelector((state) => state.user.player);
  const errorMessage = useSelector((state) => state.user.errorMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authDone) {
      if (fetchPlayer) {
        console.log("LOOOOGIIIIN");
        setAuthDone(true);
        props.navigation.navigate("Profile");
      }
    }
  }, [fetchPlayer]);

  if (registrationDisplay) {

    // REGISTRATION
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={20}
      >
        <View style={styles.main}>
          <Text style={styles.formHeading}>Create new account</Text>
          {/* email */}
          <TextInput onChangeText={text => setEmail(text)} style={styles.input} placeholder="email">{email}</TextInput>
          {/* password */}
          <TextInput onChangeText={text => setPassword(text)} style={styles.input} placeholder="password">{password}</TextInput>
          {/* nickname */}
          <TextInput onChangeText={text => setNickname(text)} style={styles.input} placeholder="nickname">{nickname}</TextInput>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
                dispatch(
                  authActions.registration({
                    email: email,
                    password: password,
                    nickname: nickname
                  })
                );
              }}
          >
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
          <Text style={styles.errorMessage}>{errorMessage && errorMessage}</Text>
          <TouchableOpacity
            onPress={() => {
              setRegistrationDisplay(false);
            }}
          >
            <Text>Go back to login screen</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  } else {

    //   LOGIN
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={20}
      >
        <View style={styles.main}>
          <Text style={styles.formHeading}>Sign in</Text>
          {/* email */}
          <TextInput onChangeText={text => setEmail(text)} style={styles.input} placeholder="email">{email}</TextInput>
          {/* password */}
          <TextInput onChangeText={text => setPassword(text)} style={styles.input} placeholder="password">{password}</TextInput>
          <TouchableOpacity
          style={styles.submitButton}

            onPress={() => {
              dispatch(
                authActions.login({
                  email: email,
                  password: password,
                })
              );
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.errorMessage}>{errorMessage && errorMessage}</Text>

          <TouchableOpacity
            onPress={() => {
              setRegistrationDisplay(true);
            }}
          >
            <Text >Create new account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
};

Authentication.navigationOptions = (navData) => {
  return {
    headerTitle: "J U N G L E",
  };
};

export default Authentication;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    width: "60%",
    margin: 5,
  },
  submitButton: {
    borderColor: "green",
    marginTop: 15,
    marginBottom: 25,
    padding: 3,
    borderWidth: 2,
    backgroundColor: "green",
    borderRadius: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  formHeading: {
    marginBottom: 20,
    fontSize: 15,
  },
  errorMessage:{
      color:'red'
  }
});

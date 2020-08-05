import React, { useReducer, useEffect } from "react";
import { StyleSheet, Text, View, TextInput} from "react-native";


const Input = (props) => {




  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        value={inputState.value}
        style={styles.input}
        onChangeText={(text) => textChangeHandler(text)}
        onBlur={lostFocusHandler}
      />

      {/* error text */}
      {!inputState.isValid && inputState.touched && <Text>{props.errorText}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  description: {},
});
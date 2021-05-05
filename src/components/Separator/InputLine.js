import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const InputLine = ({
  nameIcon,
  placeHolderText,
  autoCompType,
  secure,
  setState,
  currentValue,
  additionalStyling,
  functionOnEnd,
}) => (
  <View style={{ ...styles.InputBlock, ...additionalStyling }}>
    <Ionicons name={nameIcon} size={23} color="#9A9A9A" style={styles.IconInput} />
    <TextInput
      style={styles.TextInput}
      placeholder={placeHolderText}
      autoCapitalize="none"
      autoCorrect={false}
      autoCompleteType={autoCompType}
      secureTextEntry={secure}
      onChangeText={setState}
      value={currentValue}
      onEndEditing={functionOnEnd}
    />
  </View>
);

const styles = StyleSheet.create({
  InputBlock: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    maxWidth: 400,
    alignSelf: "center",
    marginBottom: 20,
  },
  IconInput: {
    paddingLeft: 25,
    paddingRight: 20,
    alignItems: "center",
  },
  TextInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
  },
  test: {
    padding: 15,
  },
});

export default InputLine;

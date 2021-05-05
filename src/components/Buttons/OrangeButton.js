import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";

const OrangeButton = ({ TextButton, functionToCall }) => (
  <>
    <TouchableHighlight
      activeOpacity={0.9}
      onPress={functionToCall}
      style={styles.buttonLog}
      underlayColor="#DB7C00"
    >
      <View style={styles.containerButton}>
        <Text style={styles.textButton}>{TextButton}</Text>
      </View>
    </TouchableHighlight>
  </>
);
const styles = StyleSheet.create({
  containerButton: {
    justifyContent: "center",
  },
  buttonLog: {
    marginVertical: 10,
    marginHorizontal: 25,
    backgroundColor: "#FF9100",
    maxWidth: 400,
    borderRadius: 25,
    alignSelf: "center",
  },
  textButton: {
    color: "white",
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignSelf: "center",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default OrangeButton;

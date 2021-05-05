import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { color } from "../../../constants/color";

const DistanceCarre = ({ onPress, textToDisplay, state, conditionnal }) => (
  <View style={styles.container}>
    <Pressable delayLongPress="65" onLongPress={onPress}>
      <View
        style={{
          ...styles.carreDistance,
          ...(state === conditionnal
            ? { backgroundColor: color.orange }
            : { backgroundColor: "#F2F2F2" }),
        }}
      >
        <Text
          style={Object.assign(
            state === conditionnal ? { color: "white" } : { color: "black" },
            styles.textToDisplay
          )}
        >
          {textToDisplay}
        </Text>
      </View>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {},
  carreDistance: {
    height: 35,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },
  textToDisplay: {
    paddingHorizontal: 10,
    flexWrap: "nowrap",
  },
});

export default DistanceCarre;

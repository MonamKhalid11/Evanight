import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { IMAGES } from "../../constants/images";

const {
  ICONS: { CONTRIBUTION: CONTRIB },
} = IMAGES;

const TransparentsBar = ({ participants, ratings, contributions }) => (
  <View style={styles.containerTransparentBar}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name="people" size={18} color="#B237BA" />
      <Text style={[styles.textTransparentBar, { color: "#C446F2" }]}>{participants}</Text>
    </View>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name="star" size={18} color="#FA544D" />
      <Text style={[styles.textTransparentBar, { color: "#FA544D" }]}>{ratings}</Text>
    </View>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image style={{ width: 25, height: 22, marginBottom: 5 }} source={CONTRIB} />
      <Text style={[styles.textTransparentBar, { color: "#FFD053" }]}>{contributions}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  containerTransparentBar: {
    height: 33,
    position: "absolute",
    width: "100%",
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "center",
  },
  textTransparentBar: {
    fontSize: 16,
    marginLeft: 12,
    alignSelf: "center",
  },
});

export default TransparentsBar;

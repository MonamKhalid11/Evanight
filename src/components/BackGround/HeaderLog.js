import React from "react";
import { View, Image, Text, StatusBar, StyleSheet } from "react-native";
import { IMAGES } from "../../constants/images";

const { LOGO } = IMAGES;

const TopBlockLog = ({ TextLog }) => (
  <View
    style={{
      backgroundColor: "#F8F8F8",
      flex: 1,
    }}
  >
    <View style={styles.topForm}>
      <StatusBar backgroundColor="#FF9100" barStyle="default" />

      <Image source={LOGO} style={{ alignSelf: "center", marginBottom: 15, marginTop: 25 }} />

      <Text style={styles.textTop}>{TextLog}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  textTop: {
    justifyContent: "center",
    marginRight: 30,
    marginBottom: 20,
    color: "white",
    fontSize: 22,
    zIndex: 2,
  },

  topForm: {
    flex: 1,
    backgroundColor: "#FF9100",
    borderBottomLeftRadius: 100,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

export default TopBlockLog;

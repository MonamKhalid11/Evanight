import React from "react";
import { View, ActivityIndicator } from "react-native";

const Splash = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator color="#999999" size="large" />
  </View>
);

export default Splash;

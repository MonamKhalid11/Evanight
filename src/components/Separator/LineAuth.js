import React from "react";
import { View, Text } from "react-native";

// Ligne orange séparatrice à l'authentification "ou"
const LineAuth = () => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: 80,
      alignSelf: "center",
    }}
  >
    <View
      style={{
        width: "100%",
        borderBottomColor: "#FFBC63",
        borderBottomWidth: 1,
      }}
    />
    <Text style={{ paddingHorizontal: 8 }}>OU</Text>
    <View
      style={{
        width: "100%",
        borderBottomColor: "#FFBC63",
        borderBottomWidth: 1,
      }}
    />
  </View>
);

export default LineAuth;

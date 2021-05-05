import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const GoBackAccount = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.blocArrow} onPress={() => navigation.goBack()}>
      <Ionicons
        name="arrow-back" // arrow-back-outline
        size={32}
        color="white"
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  blocArrow: {
    position: "absolute",
    top: "5%",
    left: "5%",
  },
});

export default GoBackAccount;

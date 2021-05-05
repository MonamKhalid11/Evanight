import { TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { color } from "../../constants/color";

const ButtonEditProfileImage = ({ onPressEditPhoto }) => {
  return (
    <TouchableOpacity onPress={onPressEditPhoto} style={styles.TouchableEdit}>
      <View style={styles.containerEdit}>
        <Ionicons
          style={{ alignSelf: "center", justifyContent: "center" }}
          name="create"
          size={21}
          color={color.orange}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerEdit: {
    backgroundColor: "white",
    borderRadius: 35,
    borderWidth: 2,
    borderColor: color.orange,
    width: 35,
    height: 35,
    justifyContent: "center",
    zIndex: 1,
  },
  TouchableEdit: {
    top: "24%",
    right: "37%",
    position: "absolute",
    alignSelf: "center",
  },
});

export default ButtonEditProfileImage;

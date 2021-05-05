import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RowSettings = ({ nameIcon, text, onPress, additionalStyling, stylingBackground }) => (
  <>
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, additionalStyling]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={[styles.containerIcon, stylingBackground]}>
            <Ionicons style={{ alignSelf: "center" }} size={16} name={nameIcon} color="#FF9100" />
          </View>
          <Text style={styles.text}>{text}</Text>
        </View>
        <Ionicons size={16} name="chevron-forward-outline" color="#FF9100" style={styles.arrow} />
      </View>
    </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  containerIcon: {
    width: 35,
    height: 35,
    borderRadius: 8,
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    paddingHorizontal: 15,
    marginRight: "18%",
  },
  arrow: {
    flexDirection: "column",
    alignSelf: "center",
  },
});

export default RowSettings;

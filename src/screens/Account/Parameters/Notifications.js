import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import GradientProfile from "../../../components/BackGround/GradientProfile";
import GoBackAccount from "../../../components/Buttons/GoBackAccount";
import { Switch } from "react-native-elements";
import { color } from "../../../constants/color";

const Notifications = () => {
  const [toggle, setToggle] = useState(true);
  const toggleSwitch = () => setToggle((previousState) => !previousState);
  // Créer une table préférence user basé sur user
  // ==> Je sais pas

  const data = Array(6)
    .fill(null)
    .map((_, i) => (
      <View key={i} style={styles.rowNotifications}>
        <Text>Recevoir des notifications quand des évènements ...</Text>
        <Switch
          color="orange"
          trackColor={{ false: "#767577", true: color.orange }}
          onValueChange={toggleSwitch}
          value={toggle}
          style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
        />
      </View>
    ));
  console.log(data);

  return (
    <GradientProfile>
      <GoBackAccount />
      <Text style={styles.textHeader}>Notifications</Text>
      {data}
    </GradientProfile>
  );
};
const styles = StyleSheet.create({
  pseudoText: {
    position: "relative",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 14,
    marginBottom: 25,
  },
  textHeader: {
    justifyContent: "center",
    position: "absolute",
    color: "#fff",
    alignSelf: "center",
    top: "5%",
    fontSize: 23,
    zIndex: 2,
  },
  rowNotifications: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 20,
    flexWrap: "nowrap",
  },
});

export default Notifications;

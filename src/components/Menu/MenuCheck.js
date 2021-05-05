import React from "react";
import { StyleSheet } from "react-native";
import { MenuOption } from "react-native-popup-menu";
import MenuContainer from "./MenuContainer";
import { CheckBox } from "react-native-elements";

const MyMenuOptions = ({ textSubMenu, value, toggle }) => {
  return (
    <MenuContainer>
      <MenuOption onSelect={toggle} style={styles.sousMenu}>
        <CheckBox
          center
          title={textSubMenu}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checked={value}
        />
      </MenuOption>
    </MenuContainer>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    paddingLeft: 5,
    paddingVertical: 5,
  },
  sousMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default MyMenuOptions;

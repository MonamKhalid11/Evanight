import React from "react";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";

const MenuContainer = ({ nameMenu, children }) => {
  const optionsStyles = {
    optionsContainer: {
      padding: 3,
      width: 250,
    },
  };

  return (
    <Menu style={{ flexDirection: "row", marginRight: 10 }}>
      <MenuTrigger
        style={styles.triggerMenu}
        text={nameMenu}
        customStyles={{
          TriggerTouchableComponent: TouchableWithoutFeedback,
        }}
      />
      <MenuOptions customStyles={optionsStyles}>{children}</MenuOptions>
    </Menu>
  );
};

const styles = StyleSheet.create({
  triggerMenu: {
    borderWidth: 1,
    borderColor: "lightgrey",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 25,
    backgroundColor: "white",
  },
});

export default MenuContainer;

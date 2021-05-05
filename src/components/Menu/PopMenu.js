import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  CheckBox,
  Pressable,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import "moment/locale/fr";

const PopMenu = ({
  nomMenu,
  sousmenu1,
  sousmenu2,
  sousmenu3,
  sousmenu4,
  sousmenu5,
  onPress1,
  onPress2,
  onPress3,
  onPress4,
  value1,
  value2,
  value3,
  date1,
  date2,
  when,
  show,
  onChange1,
  onChange2,
  setShow,
}) => {
  const optionsStyles = {
    // container menu sort by
    optionsContainer: {
      padding: 3,
      width: 250,
    },
  };

  return (
    <>
      <Menu style={{ flexDirection: "row", marginRight: 10 }}>
        <MenuTrigger
          style={styles.visible}
          text={nomMenu}
          customStyles={{
            TriggerTouchableComponent: TouchableWithoutFeedback,
          }}
        />
        <MenuOptions customStyles={optionsStyles}>
          <MenuOption onSelect={onPress1} style={styles.sousMenu}>
            <Text style={styles.text}>{sousmenu1}</Text>
            {value1 !== undefined && (
              <CheckBox value={value1} onValueChange={onPress1} style={styles.checkbox} />
            )}
            {sousmenu1 === "Tous" &&
              when === "" && ( // Faire apparaitre checkbox seulement si case sélectionné
                <CheckBox
                  value
                  // onValueChange={onPress1}
                  style={styles.checkbox}
                />
              )}
          </MenuOption>
          <MenuOption onSelect={onPress2} style={styles.sousMenu}>
            <Text style={styles.text}>{sousmenu2}</Text>
            {value2 !== undefined && (
              <CheckBox value={value2} onValueChange={onPress2} style={styles.checkbox} />
            )}
            {sousmenu2 === "Aujourd'hui" && when === "&jours=1" && (
              <CheckBox
                value
                // onValueChange={onPress1}
                style={styles.checkbox}
              />
            )}
          </MenuOption>
          <MenuOption onSelect={onPress3} style={styles.sousMenu}>
            <Text style={styles.text}>{sousmenu3}</Text>
            {value3 !== undefined && (
              <CheckBox value={value3} onValueChange={onPress3} style={styles.checkbox} />
            )}
            {sousmenu3 === "Demain" && when === "&jours=2" && (
              <CheckBox
                value
                // onValueChange={onPress1}
                style={styles.checkbox}
              />
            )}
          </MenuOption>
          {sousmenu4 && (
            <MenuOption onSelect={onPress4} style={styles.sousMenu}>
              <Text style={styles.text}>{sousmenu4}</Text>
              {sousmenu4 === "Cette semaine" && when === "&jours=7" && (
                <CheckBox
                  value
                  // onValueChange={onPress1}
                  style={styles.checkbox}
                />
              )}
            </MenuOption>
          )}
          {sousmenu5 && (
            <MenuOption>
              <Text style={date1 || date2 ? [styles.text, { color: "red" }] : styles.text}>
                {sousmenu5}
              </Text>
              {sousmenu5 === "Choisir une date / intervalle" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    marginBottom: 4,
                  }}
                >
                  <Pressable onPressIn={() => setShow({ show1: true })}>
                    <View style={styles.inputText}>
                      <Text style={{ paddingVertical: 4, alignSelf: "center" }}>
                        {date1 ? moment(date1).locale("fr").format("L") : "De"}
                      </Text>
                    </View>
                  </Pressable>
                  {show.show1 && (
                    <RNDateTimePicker
                      locale="fr-FR"
                      value={date1 || 1970}
                      mode="date"
                      display="default"
                      onChange={onChange1}
                      minimumDate={new Date()}
                    />
                  )}
                  <Pressable onPressIn={() => setShow({ show2: true })}>
                    <View style={styles.inputText}>
                      <Text
                        style={{
                          paddingVertical: 4,
                          alignSelf: "center",
                        }}
                      >
                        {date2 ? moment(date2).locale("fr").format("L") : "A"}
                      </Text>
                    </View>
                  </Pressable>
                  {show.show2 && (
                    <RNDateTimePicker
                      value={date2 || 1970}
                      mode="date"
                      display="default"
                      onChange={onChange2}
                      minimumDate={date1 || new Date()}
                    />
                  )}
                </View>
              )}
            </MenuOption>
          )}
        </MenuOptions>
      </Menu>
    </>
  );
};

const styles = StyleSheet.create({
  visible: {
    borderWidth: 1,
    borderColor: "lightgrey",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 25,
    backgroundColor: "white",
  },
  text: {
    color: "black",
    paddingLeft: 5,
    paddingVertical: 5,
  },
  checkbox: {
    marginRight: 10,
    padding: 0,
    margin: 0,
  },
  sousMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    borderColor: "lightgrey",
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    minWidth: 80,
  },
});

export default PopMenu;

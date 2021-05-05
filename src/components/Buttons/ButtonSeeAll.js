import { TouchableWithoutFeedback, Text, StyleSheet } from "react-native";

import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../constants/color";
import SearchContext from "../../context/SearchContext";

const ButtonSeeAll = ({ filter }) => {
  const navigation = useNavigation();
  // filter = ratings || participants
  const { setDate1, setDate2, setWhen, setEventsApi, setFilter } = useContext(SearchContext);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate("Rechercher");
        setFilter(filter);
        setWhen(""), setEventsApi("");
        setDate1("");
        setDate2("");
      }}
    >
      <Text style={styles.voirTous}>Voir tous</Text>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  voirTous: {
    alignSelf: "flex-end",
    marginRight: 15,
    marginTop: 20,
    textDecorationLine: "underline",
    color: color.orange,
  },
});

export default ButtonSeeAll;

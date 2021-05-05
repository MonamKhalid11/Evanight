import React from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";

const GenreFiltres = ({ setToggle, colorBg, title_genre, image_genre, styleSelected }) => (
  <View style={{ marginBottom: 30 }}>
    <Pressable delayLongPress="40" onLongPress={(toggle) => setToggle(toggle)}>
      <View style={[styleSelected, styles.containerCategorie, { backgroundColor: colorBg }]}>
        <Image style={{ width: 30, height: 30 }} source={image_genre} />
      </View>
    </Pressable>
    <Text style={{ alignSelf: "center", justifyContent: "flex-end" }}>{title_genre}</Text>
  </View>
);

const styles = StyleSheet.create({
  containerCategorie: {
    borderRadius: 50,
    width: 53,
    height: 53,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
    margin: 10,
    alignContent: "center",
    padding: 5,
  },
});

export default GenreFiltres;

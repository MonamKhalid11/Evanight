import React from "react";
import { Image, Text, View, StyleSheet, Dimensions } from "react-native";
import OrangeButton from "../../components/Buttons/OrangeButton";
import { IMAGES } from "../../constants/images";

const { IMAGE_ACCUEIL_ERROR } = IMAGES;
const { width, height } = Dimensions.get("screen");

const HomeError = ({ searchApiParticipants, errorFetchData }) => {
  return (
    <View style={styles.containerError}>
      <Image
        style={{ width: 200, height: 151 }}
        resizeMode="contain"
        source={IMAGE_ACCUEIL_ERROR}
      />
      <Text style={styles.errortext}>{errorFetchData}</Text>
      <OrangeButton
        TextButton="Réessayer"
        functionToCall={() => searchApiParticipants({ filter: "participants" })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  errortext: {
    color: "#333",
    marginVertical: 10,
    alignSelf: "center",
  },
  containerError: {
    width,
    marginTop: 50,

    alignItems: "center",
    alignContent: "center",
    paddingRight: 15,
    height,
  },
});

export default HomeError;

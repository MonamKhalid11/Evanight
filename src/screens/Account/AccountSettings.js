import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView, Share } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RowSettings from "./RowSettings";

const CompteParametres = ({ navigation: { goBack, navigate } }) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "http://adresse-de-l'application.com",
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView style={{ marginTop: 25 }}>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <TouchableWithoutFeedback onPress={goBack}>
          <Ionicons style={{ marginLeft: 18 }} size={30} name="arrow-back" />
        </TouchableWithoutFeedback>
        <View
          style={{
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 18,
              marginRight: 88,
            }}
          >
            Paramètres
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 50 }}>
        <RowSettings
          text="Informations personnelles"
          nameIcon="search"
          onPress={() => navigate("InfoPerso")}
        />

        <View style={styles.line} />
        <RowSettings
          text="Notifications"
          nameIcon="notifications"
          onPress={() => navigate("Notifications")}
        />
        <View style={styles.line} />
        <RowSettings text="Visibilité" nameIcon="eye" />
        <View style={styles.line} />
        <RowSettings text="Préférences évènements" nameIcon="heart-circle" />
        <View style={styles.line} />
        <RowSettings text="Noter l'application" nameIcon="star" />
        <View style={styles.line} />
        <RowSettings
          text="Partager l'application"
          nameIcon="share-social"
          onPress={() => onShare()}
        />
        <View style={styles.line} />

        <RowSettings text="Conditions générales d'utilisation" nameIcon="people" />
        <View style={styles.line} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  line: {
    marginHorizontal: 20,
    backgroundColor: "#DDDDDD",
    height: 1,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default CompteParametres;

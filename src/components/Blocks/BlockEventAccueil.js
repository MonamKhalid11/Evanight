/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { color } from "../../constants/color";
import TransparentsBar from "./BlockTransparentsBar";
import { directionToEvent } from "../../helperFunctions/directionToEvent";
import { imageToDisplay } from "../../helperFunctions/imageHeaderToDisplay";

const BlocEventAccueil = ({ item, likedEvents, currentAddress, eventsLiked }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.containerBloc}>
      <Pressable
        onPress={() =>
          navigation.navigate("DetailsEvents", {
            item,
          })
        }
      >
        <ImageBackground style={styles.image} source={imageToDisplay(item)}>
          <TransparentsBar
            participants={
              item.users_events_likeds.length > 0
                ? item.users_events_likeds[0].number_of_participants
                : 0
            }
            ratings={
              item.event_ratings.length > 0 ? item.event_ratings[0].ratings.toFixed(1) : "N/A"
            }
            contributions="50 t"
          />
        </ImageBackground>
        <Text numberOfLines={2} style={{ padding: 10, fontSize: 16, fontWeight: "bold" }}>
          {item.title}
        </Text>
      </Pressable>

      <TouchableOpacity
        onPress={likedEvents}
        style={{ position: "absolute", right: 10, bottom: 10 }}
      >
        <Ionicons
          name={eventsLiked.includes(item.id) ? "heart" : "heart-outline"}
          size={30}
          color="#fb3958"
        />
      </TouchableOpacity>

      <View>
        <View style={styles.informationText}>
          <Ionicons name="time" size={23} color={color.orange} style={styles.icone} />
          <Text>
            {item.start_time !== "Invalid date" || item.end_time !== null
              ? item.start_time
              : "Date inconnue"}
          </Text>
        </View>

        <View style={styles.informationText}>
          <Ionicons name="location" size={23} color={color.orange} style={styles.icone} />
          {item.address_1 !== "N/A" ? (
            <Text numberOfLines={1} style={{ width: "53%" }}>
              {item.address_1}
            </Text>
          ) : (
            <Text>Pas d'adresse connue à ce jour.</Text>
          )}

          <TouchableWithoutFeedback onPress={() => directionToEvent(currentAddress, item)}>
            <Text
              numberOfLines={1}
              style={{
                width: "30%",
                textDecorationLine: "underline",
              }}
            >
              {currentAddress.coords.latitude !== 46.227638 && item.distance
                ? `(à ${item.distance.toFixed(1)} km)`
                : null}
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerBloc: {
    width: 300,
    height: 310,
    backgroundColor: "white",
    margin: 3,
    marginBottom: 8,
    padding: 0, // intérieur carte espace
    marginRight: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  informationText: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 8,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icone: {
    paddingHorizontal: 5,
  },
  image: {
    height: 130,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default BlocEventAccueil;

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { color } from "../../constants/color";
import { directionToEvent } from "../../helperFunctions/directionToEvent";
import { imageToDisplay } from "../../helperFunctions/imageHeaderToDisplay";

const BlocEvent = ({
  currentAddress,
  index,
  item,
  eventsLiked,
  likedEvents,
  marginTopFirstElement,
}) => {
  const navigation = useNavigation();
  const couleurLabelGenre = () => {
    switch (item.genre) {
      case "Bar": {
        return { backgroundColor: "#F8477A" };
      }
      case "Club": {
        return { backgroundColor: "#27BC65" };
      }
      case "Festival": {
        return { backgroundColor: "#BC3BB9" };
      }
      case "Concert": {
        return { backgroundColor: color.orange };
      }
    }
  };

  return (
    <View
      style={{
        ...styles.BlocEvent,
        ...(index === 0 && { marginTop: marginTopFirstElement }),
      }}
    >
      <Pressable
        onPress={() =>
          navigation.navigate("DetailsEvents", {
            item,
          })
        }
      >
        <View>
          <Image style={styles.image} source={imageToDisplay(item)} />
          <View style={styles.blockTransparent} />
          <Text numberOfLines={2} style={styles.title_event}>
            {item.title}
          </Text>
          <View style={styles.ligneText} />
          <View style={[styles.vignetteContainer, couleurLabelGenre()]}>
            <Text style={item.genre && styles.vignetteText}>{item.genre}</Text>
          </View>
          {item.event_ratings.length > 0 && (
            <View style={[styles.ratingContainer, couleurLabelGenre()]}>
              <Text style={styles.vignetteText}>{item.event_ratings[0].ratings.toFixed(1)} ★</Text>
            </View>
          )}
        </View>
      </Pressable>
      <View>
        <TouchableOpacity
          onPress={likedEvents}
          style={{ position: "absolute", right: 15, top: 20 }}
        >
          <Ionicons
            name={eventsLiked.includes(item.id) ? "heart" : "heart-outline"}
            size={30}
            color="#fb3958"
          />
        </TouchableOpacity>
      </View>
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
            // eslint-disable-next-line react/no-unescaped-entities
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
  BlocEvent: {
    height: 174,
    borderRadius: 10,
    marginBottom: 18,
    borderColor: "black",
    marginHorizontal: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 2,
  },
  image: {
    height: 90,
    borderRadius: 10,
    width: "100%",
  },
  title_event: {
    position: "absolute",
    bottom: 10,
    marginLeft: 10,
    color: "white",
    fontSize: 18,
    fontWeight: "bold",

    width: "90%",
  },
  vignetteContainer: {
    position: "absolute",
    backgroundColor: "purple",
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  ratingContainer: {
    position: "absolute",
    right: 0,

    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  vignetteText: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    color: "white",
    fontSize: 15,
  },
  ligneText: {
    height: 2,
    width: 45,
    borderColor: "white",
    borderWidth: 1,
    position: "absolute",
    bottom: 6,
    marginLeft: 15,
    backgroundColor: "white",
  },
  blockTransparent: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.36)",
    zIndex: 0,
    height: 90,
    borderRadius: 10,
    width: "100%",
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
  labelBar: {
    position: "absolute",
    top: 6,
    backgroundColor: "green",
    marginLeft: 10,
    borderRadius: 10,
  },
});

export default BlocEvent;

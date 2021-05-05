import React, { useContext, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { directionToEvent } from "../../helperFunctions/directionToEvent";
import { color } from "../../constants/color";
import { likedEvents } from "../../helperFunctions/handleLike";
import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { IMAGES } from "../../constants/images";
import SearchContext from "../../context/SearchContext";
import AuthContext from "../../context/AuthContext";

const ItemListCart = ({ item, CARD_HEIGHT, CARD_WIDTH }) => {
  const navigation = useNavigation();
  const { location } = useContext(SearchContext);
  const { eventsLiked, setEventsLiked, user } = useContext(AuthContext);

  const likeIcon = useMemo(
    () => (
      <Ionicons
        size={30}
        name={eventsLiked.includes(item.id) ? "heart" : "heart-outline"}
        color={color.orange}
      />
    ),
    [eventsLiked]
  );

  return (
    <View style={[styles.card, { width: CARD_WIDTH, height: CARD_HEIGHT }]} key={item.id}>
      <Pressable style={{ flex: 3 }} onPress={() => navigation.navigate("DetailsEvents", { item })}>
        <Image source={IMAGES.IMAGE_RECHERCHER} style={styles.cardImage} />
      </Pressable>
      <Pressable
        style={styles.titleEvent}
        onPress={() => navigation.navigate("DetailsEvents", { item })}
      >
        <View>
          <Text numberOfLines={2} style={styles.cardTitle}>
            {item.title}
          </Text>
        </View>
      </Pressable>
      <View style={styles.separatorLigne} />
      <Pressable
        delayLongPress="70"
        onLongPress={() => directionToEvent(location, item)}
        style={{ flex: 2, justifyContent: "center" }}
      >
        <View style={{ marginTop: 0, flexDirection: "row" }}>
          <View style={[styles.containerIcon, { marginLeft: 10, marginRight: 10 }]}>
            <Ionicons color={color.orange} name="location" size={25} />
          </View>
          <View style={styles.containerText}>
            <Text
              numberOfLines={1}
              style={[styles.cardAddress, { width: "70%", fontWeight: "bold" }]}
            >
              {item.address_1}
            </Text>
            <Text numberOfLines={2} style={{ color: "black", width: "65%" }}>
              {item.address_2}
              {location.coords.latitude !== 46.227638 && ` - (à ${item.distance.toFixed(1)} km)`}
            </Text>
          </View>
        </View>
      </Pressable>
      <View style={styles.separatorLigne} />
      <View style={{ flex: 2, justifyContent: "center" }}>
        <View style={{ marginTop: 0, flexDirection: "row" }}>
          <View style={[styles.containerIcon, { marginLeft: 10, marginRight: 10 }]}>
            <Ionicons size={22} color={color.orange} name="calendar" />
          </View>
          <View style={styles.containerText}>
            <Text numberOfLines={1} style={styles.cardAddress}>
              {item.start_time}
            </Text>
            {item.end_time !== null && (
              <Text>
                {`Termine le ${moment(item.end_time).locale("fr").format("Do MMMM, [à] HH:mm")}`}
              </Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.separatorLigne} />
      <View style={styles.containerIcon2}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => likedEvents(item, setEventsLiked, eventsLiked, user)}>
            {likeIcon}
          </TouchableOpacity>

          <Text style={{ alignSelf: "center" }}>Enregistrer</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => console.log("r")}>
            <Ionicons size={30} name="share-social-outline" color={color.orange} />
          </TouchableOpacity>

          <Text style={{ alignSelf: "center" }}>Partager</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.backgroundIconFlatlist}>
            <TouchableOpacity>
              <Ionicons size={30} name="pricetag-outline" color={color.orange} />
            </TouchableOpacity>
          </View>
          <Text style={{ alignSelf: "center" }}>Billets</Text>
        </View>
      </View>
    </View>
  );
};

export default ItemListCart;

const styles = StyleSheet.create({
  card: {
    elevation: 2,
    marginRight: 20,
    zIndex: 2,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },

  cardTitle: {
    fontSize: 16,
    // marginTop: 5,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  cardAddress: {
    textTransform: "capitalize",
    color: "black",
    fontWeight: "bold",
  },
  titleEvent: {
    flex: 1,
    padding: 10,
    marginTop: 0,
    justifyContent: "center",
  },
  containerIcon2: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
});

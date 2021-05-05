import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import React, { useCallback, useContext, useState } from "react";
import {
  Alert,
  Dimensions,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TransparentsBar from "../components/Blocks/BlockTransparentsBar";
import { color } from "../constants/color";
import AuthContext from "../context/AuthContext";
import SearchContext from "../context/SearchContext";
import { directionToEvent } from "../helperFunctions/directionToEvent";
import { likedEvents } from "../helperFunctions/handleLike";
import { IMAGES } from "../constants/images";
import { imageToDisplay } from "../helperFunctions/imageHeaderToDisplay";

const { height } = Dimensions.get("screen");

const DetailsEvents = ({ route, navigation }) => {
  const [results] = useState(route.params.item);
  const { location } = useContext(SearchContext);
  const { eventsLiked, setEventsLiked, user } = useContext(AuthContext);
  const [textShown, setTextShown] = useState(false); // show remaining texxt
  const [lengthMore, setLengthMore] = useState(false); // to show the "Read more & Less Line"
  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };
  console.log(results);

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length > 4); // to check the text is more than 4 lines or not
  }, []);

  const openURL = async () => {
    const supported = await Linking.canOpenURL(`http://${results.ticket}`);
    if (supported) {
      await Linking.openURL(`http://${results.ticket}`);
    } else {
      Alert.alert("Il semblerait que l'adresse url ne soit pas une adresse valide.");
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageBackground
        style={{ height: height * 0.25, width: "100%" }}
        source={imageToDisplay(results)}
      >
        <Pressable style={styles.blocArrow} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={32} color="white" />
        </Pressable>
        <TransparentsBar
          participants={
            results.users_events_likeds.length > 0
              ? results.users_events_likeds[0].number_of_participants
              : 0
          }
          ratings={
            results.event_ratings.length > 0 ? results.event_ratings[0].ratings.toFixed(1) : "N/A"
          }
          contributions="50 t"
        />
      </ImageBackground>
      <View style={{ marginLeft: 15, paddingTop: 15 }}>
        <Text style={styles.title}>{results.title}</Text>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 15,
          }}
        >
          <Text style={styles.categorieText}>{results.genre}</Text>
        </View>
        <Pressable onPress={() => directionToEvent(location, results)}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.containerIcon}>
              <Ionicons color={color.orange} name="location" size={25} />
            </View>
            <View style={styles.containerText}>
              <Text style={{ fontWeight: "bold", marginBottom: 2 }}>{results.address_1}</Text>
              <Text>{results.address_2} </Text>
            </View>
          </View>
        </Pressable>
        <View style={styles.interLigne} />
        <View style={{ flexDirection: "row" }}>
          <View style={styles.containerIcon}>
            <Ionicons color={color.orange} name="calendar" size={25} />
          </View>
          <View style={styles.containerText}>
            <Text numberOfLines={1} style={[styles.cardAddress, { marginBottom: 2 }]}>
              {results.start_time}
            </Text>
            {results.end_time !== null && (
              <Text style={{ color: color.orange, textTransform: "uppercase" }}>
                {`Termine le ${moment(results.end_time).locale("fr").format("Do MMMM, [à] HH:mm")}`}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.interLigne} />

        <View style={styles.containerCTA}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => likedEvents(results, setEventsLiked, eventsLiked, user)}
            >
              <Ionicons
                size={30}
                name={eventsLiked.includes(results.id) ? "heart" : "heart-outline"}
                color={color.orange}
              />
            </TouchableOpacity>

            <Text style={{ alignSelf: "center" }}>Enregistrer</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity>
              <Ionicons size={30} name="share-social-outline" color={color.orange} />
            </TouchableOpacity>

            <Text style={{ alignSelf: "center" }}>Partager</Text>
          </View>
          {results.ticket && (
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity onPressOut={() => openURL()}>
                <Ionicons size={30} name="pricetag-outline" color={color.orange} />
              </TouchableOpacity>

              <Text style={{ alignSelf: "center" }}>Billets</Text>
            </View>
          )}
        </View>
        <View style={styles.interLigne} />
        <View>
          <Text style={styles.titleCategorie}>Détails</Text>
          <Text onTextLayout={onTextLayout} numberOfLines={textShown ? undefined : 5}>
            {results.description}
          </Text>
          {lengthMore ? (
            <Text onPress={toggleNumberOfLines} style={styles.showMoreOrLessText}>
              {textShown ? "Lire moins..." : "Lire plus ..."}
            </Text>
          ) : null}
        </View>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 16, marginVertical: 15 }}>Organisé par</Text>
          <Text>{results.event_by} </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  blocArrow: {
    position: "absolute",
    top: "5%",
    left: "5%",
  },
  containerText: {
    alignContent: "center",
    paddingVertical: 10,
  },
  containerIcon: {
    justifyContent: "center",
    alignContent: "center",
    marginRight: 20,
  },
  cardAddress: {
    textTransform: "capitalize",
    color: "black",
    fontWeight: "bold",
  },
  categorieText: {
    color: color.orange,
    backgroundColor: "#FFF3E3",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
    fontWeight: "bold",
    marginRight: 15,
  },
  interLigne: {
    maxWidth: "100%",
    marginRight: 15,
    borderColor: "#E8E1E1",
    borderWidth: 0.6,
    marginVertical: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    width: "85%",
    lineHeight: 23,
  },
  containerCTA: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    marginRight: 20,
  },
  showMoreOrLessText: {
    lineHeight: 21,
    marginTop: 10,
    textDecorationLine: "underline",
    alignSelf: "center",
    color: color.orange,
  },
  titleCategorie: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 15,
  },
});

export default DetailsEvents;

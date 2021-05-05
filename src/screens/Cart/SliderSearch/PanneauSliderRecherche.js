import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Pressable,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";
import GenreFiltres from "./GenreFiltres";
import { color } from "../../../constants/color";
import "moment/locale/fr";
import DistanceCarre from "./DistanceCarre";
import SearchContext from "../../../context/SearchContext";
import { IMAGES } from "../../../constants/images";

const {
  IMAGES_MAP: { ICONES_CATEGORIES: BAR, CLUB, CONCERT, FESTIVAL },
} = IMAGES;
const FILTER_HEADER = IMAGES.IMAGES_MAP.UTILS;

const PanneauSliderRecherche = ({ searchApi }) => {
  const { setWhen, when, date1, setDate1, date2, setDate2, setEventsApi, eventApi } = useContext(
    SearchContext
  );
  const [toggle, setToggle] = useState({
    club: true,
    festival: true,
    concert: true,
    bar: true,
  });
  const [show, setShow] = useState({ show1: false, show2: false }); // Display date menu on click by making it true

  useEffect(() => {
    const identifiers = Object.keys(toggle);
    const active = identifiers.filter(
      (id) => toggle[id] // récupère les valeurs true de l'objet sous forme d'array
    );

    if (active.length === 0) {
      setEventsApi("");
    } else if (active.length === 1) {
      setEventsApi([active[0]]);
    } else if (active.length === 2) {
      setEventsApi([active[0], active[1]]);
    } else if (active.length === 3) {
      setEventsApi([active[0], active[1], active[2]]);
    } else if (active.length === 4) {
      setEventsApi([active[0], active[1], active[2], active[3]]);
    }
  }, [toggle]);

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setShow(Platform.OS === "ios");
    setDate1(currentDate);
    setWhen("&jours=3000");
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setShow(Platform.OS === "ios");
    setDate2(currentDate);
    setWhen("&jours=3000");
  };

  const emptyDate = () => {
    setDate1("");
    setDate2("");
  };

  const renderContent = () => (
    <View style={styles.containerSliderBody}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
      <Text style={{ fontWeight: "bold", marginBottom: 15 }}>GENRE</Text>
      <View style={styles.containerGenre}>
        <GenreFiltres
          colorBg="#26a907"
          toggle={toggle}
          setToggle={() => setToggle({ ...toggle, club: !toggle.club })}
          title_genre="Clubs"
          image_genre={CLUB}
          styleSelected={!toggle.club && { opacity: 0.5 }}
        />
        <GenreFiltres
          colorBg="#ff4ab3"
          toggle={toggle}
          setToggle={() => setToggle({ ...toggle, bar: !toggle.bar })}
          title_genre="Bars"
          image_genre={BAR}
          styleSelected={!toggle.bar && { opacity: 0.5 }}
        />
        <GenreFiltres
          colorBg="#007fff"
          toggle={toggle}
          setToggle={() => setToggle({ ...toggle, festival: !toggle.festival })}
          title_genre="Festivals"
          image_genre={FESTIVAL}
          styleSelected={!toggle.festival && { opacity: 0.5 }}
        />
        <GenreFiltres
          colorBg="#fb8800"
          toggle={toggle}
          setToggle={() => setToggle({ ...toggle, concert: !toggle.concert })}
          title_genre="Concerts"
          image_genre={CONCERT}
          styleSelected={!toggle.concert && { opacity: 0.5 }}
        />

        <View style={{ width: Dimensions.get("screen").width }}>
          <Text
            style={{
              fontWeight: "bold",
              marginVertical: 15,
            }}
          >
            QUAND ?
          </Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} nestedScrollEnabled>
          <DistanceCarre
            onPress={() => {
              setWhen("");
              emptyDate();
            }}
            textToDisplay="Tous"
            state={when}
            conditionnal=""
          />
          <DistanceCarre
            onPress={() => {
              setWhen("&jours=1");
              emptyDate();
            }}
            textToDisplay="Aujourd'hui"
            state={when}
            conditionnal="&jours=1"
          />
          <DistanceCarre
            onPress={() => {
              setWhen("&jours=2");
              emptyDate();
            }}
            textToDisplay="Ce week-end"
            state={when}
            conditionnal="&jours=2"
          />
          <DistanceCarre
            onPress={() => {
              setWhen("&jours=7");
              emptyDate();
            }}
            textToDisplay="Cette semaine"
            state={when}
            conditionnal="&jours=7"
          />
        </ScrollView>
      </View>
      <View>
        <Text
          style={{
            fontWeight: "bold",
            marginVertical: 15,
            marginTop: 30,
            textTransform: "uppercase",
          }}
        >
          Sélectionner une date / intervalle
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
          }}
        >
          <Pressable delayLongPress="70" onLongPress={() => setShow({ show1: true })}>
            <View style={styles.inputText}>
              <Text style={{ paddingVertical: 4, alignSelf: "center" }}>
                {date1 ? moment(date1).locale("fr").format("ddd Do MMMM YYYY") : "De"}
              </Text>
            </View>
          </Pressable>
          {show.show1 && (
            <RNDateTimePicker
              locale="fr-FR"
              value={date1 || 1970}
              mode="date"
              display="default"
              onChange={() => onChange1()}
              minimumDate={new Date()}
            />
          )}
          <Pressable delayLongPress="70" onLongPress={() => setShow({ show2: true })}>
            <View style={styles.inputText}>
              <Text style={{ paddingVertical: 4, alignSelf: "center" }}>
                {date2 ? moment(date2).locale("fr").format("ddd Do MMMM YYYY") : "A"}
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
      </View>
      <TouchableOpacity
        delayLongPress="40"
        onLongPress={() => {
          bs.current.snapTo(1);
          searchApi(when, eventApi, undefined, date1, date2);
        }}
        style={styles.containerAppliquerBouton}
      >
        <Text style={styles.textAppliquerBouton}>Appliquer</Text>
      </TouchableOpacity>
    </View>
  );

  const bs = React.useRef(null);
  const fall = new Animated.Value(1);

  return (
    <>
      <BottomSheet
        ref={bs}
        snapPoints={["85%", 0]}
        initialSnap={1}
        borderRadius={10}
        enabledGestureInteraction
        renderContent={renderContent}
        overdragResistanceFactor="1.5"
        callbackNode={fall}
      />

      <Pressable onPress={() => bs.current.snapTo(0)}>
        <ImageBackground
          source={FILTER_HEADER}
          resizeMode="contain"
          style={{ width: 146, height: 76 }}
        >
          <View style={styles.containerTextFiltre}>
            <Text onPress={() => bs.current.snapTo(0)} style={{ color: "white", fontSize: 16 }}>
              Filtres
            </Text>
          </View>
        </ImageBackground>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  containerSliderBody: {
    height: "100%",
    backgroundColor: "white",
    paddingTop: 20,
    marginTop: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: -1,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 4,
    paddingVertical: 10,
    paddingHorizontal: 17,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: "#FF9100",
    marginBottom: 10,
  },
  containerBoutonFiltre: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  containerTextFiltre: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  containerGenre: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  InputBlock: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    maxWidth: 400,
    alignSelf: "center",
    marginBottom: 20,
    borderColor: "#E1E1E1",
    borderWidth: 1,
  },
  IconInput: {
    paddingLeft: 25,
    paddingRight: 20,
    alignItems: "center",
  },
  TextInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 8,
    paddingLeft: 25,
  },
  test: {
    padding: 15,
  },
  containerAppliquerBouton: {
    backgroundColor: color.orange,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    borderRadius: 20,
    maxWidth: 205,
    marginTop: 50,
  },
  textAppliquerBouton: {
    color: "white",
    paddingHorizontal: 10,
    fontSize: 18,
    justifyContent: "center",
    paddingVertical: 8,
  },
  inputText: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    shadowColor: "#000",
    borderColor: "lightgrey",
    borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    minWidth: 100,
  },
});

export default PanneauSliderRecherche;

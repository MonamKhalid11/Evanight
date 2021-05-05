import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Animated,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Menu, MenuOption, MenuOptions, MenuTrigger } from "react-native-popup-menu";
import useGetAllEvents from "../api/searchEvents";
import BlocEventSearch from "../components/Blocks/BlockEventSearch";
import InputLine from "../components/Separator/InputLine";
import PopMenu from "../components/Menu/PopMenu";
import AuthContext from "../context/AuthContext";
import SearchContext from "../context/SearchContext";
import { filterAndSortByResults } from "../helperFunctions/filterAndSortByResults";
import { likedEvents } from "../helperFunctions/handleLike";
import NORESULT from "../images/error/noresult.png";

const Rechercher = () => {
  const [
    searchApi,
    results,
    error,
    refreshing,
    startWatching,
    location,
    setLocation,
  ] = useGetAllEvents();
  const { user, eventsLiked, setEventsLiked } = useContext(AuthContext);
  const {
    filter,
    setFilter,
    term,
    setTerm,
    when,
    setWhen,
    eventApi,
    setEventsApi,
    date1,
    setDate1,
    date2,
    setDate2,
  } = useContext(SearchContext);

  const [toggle, setToggle] = useState({
    club: true,
    festival: true,
    concert: true,
    bar: true,
  });

  const [show, setShow] = useState({ show1: false, show2: false }); // date show date start and date end

  useEffect(() => {
    searchApi(when, eventApi, term, date1, date2, filter);
  }, [finalResults, when, eventApi, date1, date2, term, filter]);

  useEffect(() => {
    genrePourApi();
  }, [toggle]);

  const finalResults = filterAndSortByResults(results, location);

  useEffect(() => {
    startWatching();
  }, []);

  const identifiers = Object.keys(toggle);
  const genrePourApi = () => {
    const active = identifiers.filter(
      (id) => toggle[id] // récupère les valeurs true de l'objet sous forme d'array
    );
    if (active.length === 0 || active.length === 4) {
      setEventsApi("");
    } else if (active.length === 1) {
      setEventsApi([active[0]]);
    } else if (active.length === 2) {
      setEventsApi([active[0], active[1]]);
    } else if (active.length === 3) {
      setEventsApi([active[0], active[1], active[2]]);
    }
  };

  const renderItem = useCallback(
    ({ item, index }) => (
      <BlocEventSearch
        item={item}
        latitude={item.latitude}
        longitude={item.longitude}
        currentAddress={location}
        marginTopFirstElement={160}
        index={index}
        likedEvents={() => likedEvents(item, setEventsLiked, eventsLiked, user)}
        eventsLiked={eventsLiked}
      />
    ),
    [finalResults]
  );

  const scrollY = new Animated.Value(0);
  const diffClamp = Animated.diffClamp(scrollY, 0, 140);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 140],
    outputRange: [0, -140],
  });
  const optionsStyles = {
    // container menu sort by
    optionsContainer: {
      padding: 5,
      width: 250,
    },
  };
  const optionStyles = {
    // Permet de mettre en rouge l'élément sélectionné dans menu sortby
    optionText: {
      color: "red",
    },
  };

  const [sortBy, setSortBy] = useState("");
  const sortByElements = () => {
    if (sortBy === "distance") {
      return finalResults.sort((a, b) => a.distance - b.distance);
    }
    return finalResults;
  };

  const onChange1 = (event, selectedDate) => {
    // date ou intervale date
    const currentDate = selectedDate || date1;
    setShow(Platform.OS === "ios");
    setWhen("3000");
    setDate1(currentDate);
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setShow(Platform.OS === "ios");
    setWhen("3000");
    setDate2(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.animateMyView, { transform: [{ translateY }] }]}>
        <View style={styles.findAndfilter}>
          <InputLine
            currentValue={term}
            functionOnEnd={() => searchApi(when, eventApi, term, date1, date2, filter)}
            setState={setTerm}
            nameIcon="search"
            placeHolderText="Rechercher un évènement"
            additionalStyling={styles.inputSearch}
          />

          <Menu>
            <MenuTrigger
              customStyles={{
                TriggerTouchableComponent: TouchableWithoutFeedback,
              }}
            >
              <View style={styles.iconeBackGround}>
                <FontAwesomeIcon icon={faSort} size={23} color="#FF9100" />
              </View>
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption
                customStyles={sortBy === "" ? optionStyles : null}
                onSelect={() => {
                  setSortBy("");
                  setFilter("");
                }}
                text="Tri : Date (défaut)"
              />

              <MenuOption
                customStyles={sortBy === "distance" ? optionStyles : null}
                onSelect={() => {
                  setSortBy("distance");
                }}
                text="Tri : Distance"
              />
              <MenuOption
                text="Tri : Les plus populaires"
                customStyles={sortBy === "populaires" ? optionStyles : null}
                onSelect={() => {
                  setSortBy("populaires");
                  setFilter("participants");
                }}
              />

              <MenuOption
                text="Tri : les mieux notés"
                customStyles={sortBy === "ratings" ? optionStyles : null}
                onSelect={() => {
                  setSortBy("ratings");
                  setFilter("ratings");
                }}
              />
            </MenuOptions>
          </Menu>
        </View>
        <View style={styles.menuOnglet}>
          <PopMenu
            nomMenu="En ce moment  ▼"
            sousmenu1="Tous"
            sousmenu2="Aujourd'hui"
            sousmenu3="Demain"
            sousmenu4="Cette semaine"
            sousmenu5="Choisir une date / intervalle"
            onChange1={onChange1}
            onChange2={onChange2}
            show={show}
            when={when}
            date1={date1}
            date2={date2}
            setShow={setShow}
            onPress1={() => {
              setWhen("");
              setDate1("");
              setDate2("");
            }}
            onPress2={() => {
              setWhen("1");
              setDate1("");
              setDate2("");
            }}
            onPress3={() => {
              setWhen("2");
              setDate1("");
              setDate2("");
            }}
            onPress4={() => {
              setWhen("7");
              setDate1("");
              setDate2("");
            }}
          />
          <PopMenu
            nomMenu="Genre  ▼"
            sousmenu1="Clubs"
            sousmenu2="Festivals"
            sousmenu3="Concerts"
            sousmenu4="Bars"
            onPress1={() => setToggle({ ...toggle, club: !toggle.club })}
            onPress2={() => setToggle({ ...toggle, festival: !toggle.festival })}
            onPress3={() => setToggle({ ...toggle, concert: !toggle.concert })}
            onPress4={() => setToggle({ ...toggle, bar: !toggle.bar })}
            value1={toggle.club}
            value2={toggle.festival}
            value3={toggle.concert}
            value4={toggle.bar}
          />
          <Menu>
            <MenuTrigger
              style={styles.menuTrigger}
              customStyles={{
                TriggerTouchableComponent: TouchableWithoutFeedback,
              }}
              text="Emplacement ▼"
            />
            <MenuOptions customStyles={optionsStyles}>
              <MenuOption onSelect={startWatching} text="Depuis ma position (défaut)" />
              <MenuOption />
              <View
                style={{
                  borderColor: "lightgrey",
                  borderWidth: 0.5,
                  width: "100%",
                  marginBottom: 8,
                }}
              />
              <Text style={{ marginLeft: 4 }}>Depuis une adresse / ville</Text>
              <GooglePlacesAutocomplete
                placeholder="Renseigner une adresse"
                onPress={(data, details = null) => {
                  const { lat } = details.geometry.location;
                  const { lng } = details.geometry.location;
                  if (lat && lng) {
                    setLocation({
                      coords: { latitude: lat, longitude: lng },
                    });
                  }
                }}
                query={{
                  key: "AIzaSyBmDtHJuuLcY3qpFwROafj2-IioLtVvtmw",
                  language: "fr",
                  components: "country:fr",
                }}
                fetchDetails
                styles={{
                  textInput: {
                    height: 35,
                    borderColor: "grey",
                    borderWidth: 1,
                    marginTop: 5,
                    marginHorizontal: 5,
                  },
                  powered: { display: "none" },
                  row: { height: 38 },
                  description: { fontSize: 14 },
                }}
              />
            </MenuOptions>
          </Menu>
        </View>
        {error ? <Text style={styles.errortext}>{error}</Text> : null}
      </Animated.View>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !refreshing && (
            <View
              style={{
                marginTop: 200,
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Image style={{ width: 200, height: 200 }} source={NORESULT} resizeMode="contain" />
              <Text style={{ marginTop: 30, fontSize: 16, color: "grey" }}>
                Aucun résultat pour la recherche
              </Text>
            </View>
          )
        }
        style={styles.listStyle}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => searchApi(when, eventApi, term, date1, date2, filter)}
            progressViewOffset={120}
          />
        }
        keyExtractor={(results) => results.id.toString()}
        data={sortByElements()}
        initialNumToRender={10}
        updateCellsBatchingPeriod={30}
        maxToRenderPerBatch={50}
        scrollEventThrottle={16}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
        getItemLayout={(data, index) => ({
          length: 174,
          offset: 174 * index,
          index,
        })}
        onEndReachedThreshold="0.5"
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  listStyle: {
    paddingHorizontal: 10,
    flex: 1,
  },
  menuOnglet: {
    flexDirection: "row",
    flexWrap: "nowrap",
    paddingBottom: 4,
    justifyContent: "space-around",
    marginHorizontal: 12,
  },
  findAndfilter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    paddingHorizontal: 12,
  },
  errortext: {
    color: "red",
    marginVertical: 10,
    textAlign: "center",
  },
  inputSearch: {
    marginHorizontal: 5,
    width: "80%",
  },
  iconeBackGround: {
    backgroundColor: "#FFF3E3",
    flexDirection: "row",
    flex: 1,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 100,
    marginRight: 10,
  },
  animateMyView: {
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    elevation: 1,
    zIndex: 1,
    paddingTop: 3,
  },
  menuTrigger: {
    borderWidth: 1,
    borderColor: "lightgrey",
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 25,
    backgroundColor: "white",
  },
});

export default Rechercher;

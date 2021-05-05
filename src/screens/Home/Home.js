import React, { useCallback, useContext, useEffect } from "react";
import { Dimensions, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import useGetAllEvents from "../../api/searchEvents";
import BlocEventAccueil from "../../components/Blocks/BlockEventAccueil";
import HomeLists from "../../components/Lists/HomeList";
import InputLine from "../../components/Separator/InputLine";
import AuthContext from "../../context/AuthContext";
import SearchContext from "../../context/SearchContext";
import { alertGeoLoc } from "../../helperFunctions/alertGeoLoc";
import { filterAndSortByResults } from "../../helperFunctions/filterAndSortByResults";
import { likedEvents } from "../../helperFunctions/handleLike";
import HomeError from "./HomeError";

const { width } = Dimensions.get("screen");

const Index = ({ navigation }) => {
  const { term, setTerm } = useContext(SearchContext);
  const { eventsLiked, setEventsLiked, user } = useContext(AuthContext);

  const { searchApi: searchApiRatings, results: resultsRatings } = useGetAllEvents();
  const {
    searchApi: searchApiParticipants,
    results: resultsParticipants,
    errorFetchData,
    refreshing,
    startWatching,
    location,
  } = useGetAllEvents();

  useEffect(() => {
    searchApiRatings({ filter: "ratings" });
    searchApiParticipants({ filter: "participants" });
    startWatching();
    alertGeoLoc();
  }, []);

  const finalResultsParticipants = filterAndSortByResults(resultsParticipants, location);
  const finalResultsRatings = filterAndSortByResults(resultsRatings, location);

  const renderItem = useCallback(
    ({ item }) => (
      <BlocEventAccueil
        item={item}
        currentAddress={location}
        likedEvents={() => likedEvents(item, setEventsLiked, eventsLiked, user)}
        eventsLiked={eventsLiked}
      />
    ),
    [finalResultsParticipants, finalResultsRatings]
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{ padding: 20 }}>
        <InputLine
          currentValue={term}
          functionOnEnd={() => navigation.navigate("Rechercher")}
          setState={setTerm}
          nameIcon="search"
          placeHolderText="Rechercher un évènement"
          additionalStyling={styles.inputSearch}
        />
      </View>
      {!errorFetchData ? (
        <>
          <HomeLists
            textTitle="Les plus populaires"
            results={finalResultsParticipants}
            functionOnRefresh={searchApiParticipants}
            renderItem={renderItem}
            filter="participants"
            refreshing={refreshing}
          />

          <View style={styles.interLigne} />

          <HomeLists
            textTitle="Les mieux notés"
            results={finalResultsRatings}
            functionOnRefresh={searchApiRatings}
            renderItem={renderItem}
            filter="ratings"
            refreshing={refreshing}
          />
          <View style={{ marginBottom: 60 }} />
        </>
      ) : (
        <HomeError errorFetchData={errorFetchData} searchApiParticipants={searchApiParticipants} />
      )}
      <StatusBar barStyle="dark-content" backgroundColor="rgba(255,255,255,1)" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: "white",
    paddingBottom: 60,
  },

  interLigne: {
    borderWidth: 0.8,
    borderColor: "#F2F2F2",
    maxWidth: width,
    margin: 15,
  },
});

export default Index;

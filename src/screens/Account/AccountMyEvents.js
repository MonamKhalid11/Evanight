import React, { useEffect, useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import "moment/locale/fr";
import CalendarStrip from "react-native-calendar-strip";
import { color } from "../../constants/color";
import { log } from "../../api/hostToken";
import AuthContext from "../../context/AuthContext";

import SearchContext from "../../context/SearchContext";
import { likedEvents } from "../../helperFunctions/handleLike";
import BlocEventSearch from "../../components/Blocks/BlockEventSearch";

const { width } = Dimensions.get("window");

const CompteMesEvenements = ({ navigation }) => {
  const { location } = useContext(SearchContext);
  const { eventsLiked, setEventsLiked } = useContext(AuthContext);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [passedEvents, setPassedEvents] = useState([]);
  const [allDates, setAllDates] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const {
    user: { token },
    user,
  } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    (async function getData() {
      const results = await log(token).get(
        `/api/retrieveLikedEventsPerUser?id_user=${user.infoUser.id}`
      );

      setUpcomingEvents(results.data.upcomingEvents);
      setPassedEvents(results.data.passedEvents);
      const getDateFromUpcoming = upcomingEvents.map((item) => item.start_time_not_parsed);
      const getDateFromPassedEvents = passedEvents.map((item) => item.start_time_not_parsed);
      const dates = getDateFromUpcoming.concat(getDateFromPassedEvents);
      if (dates) {
        const array = [];
        for (let i = 0; i < dates.length; i++) {
          array.push({ date: dates[i], dots: [{ color: color.orange }] });
        }
        setAllDates(array);
      }
      setShow(true);
    })();
  }, [eventsLiked]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 350);
  }, []);

  const customDatesStyles = [
    {
      startDate: moment(),
      dateNameStyle: { color: color.orange },
      dateNumberStyle: { color: color.orange },
      dateContainerStyle: { backgroundColor: "white" },
      highlightDateNameStyle: { color: color.orange },
      highlightDateNumberStyle: { color: color.orange },
    },
  ];

  const aVenirRender = () => (
    <View style={{ backgroundColor: "#F3F2F2", flex: 1, marginHorizontal: 5 }}>
      <FlatList
        data={upcomingEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <BlocEventSearch
            item={item}
            marginTopFirstElement={50}
            latitude={item.latitude}
            longitude={item.longitude}
            currentAddress={location}
            index={index}
            likedEvents={() => likedEvents(item, setEventsLiked, eventsLiked, user)}
            eventsLiked={eventsLiked}
          />
        )}
      />
    </View>
  );

  const TerminesRender = () => (
    <View style={{ backgroundColor: "#F3F2F2", flex: 1, marginHorizontal: 5 }}>
      <FlatList
        data={passedEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <BlocEventSearch
            item={item}
            marginTopFirstElement={50}
            latitude={item.latitude}
            longitude={item.longitude}
            currentAddress={location}
            index={index}
            likedEvents={() => likedEvents(item, setEventsLiked, eventsLiked, user)}
            eventsLiked={eventsLiked}
          />
        )}
      />
    </View>
  );
  const renderScene = SceneMap({
    first: aVenirRender,
    second: TerminesRender,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "A venir" },
    { key: "second", title: "Terminés" },
  ]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="#999999" size="large" />
      </View>
    );
  }
  const renderTabBar = (props) => (
    <View>
      <View style={styles.containerAllElements}>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 20,
            left: 30,
            color: "white",
          }}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={{ color: "white", fontSize: 28 }}>{new Date().getFullYear()}</Text>
          <Text style={{ color: "white", fontSize: 16 }}>
            {moment().locale("fr").format("dddd Do MMMM")}
          </Text>
          {show ? (
            <CalendarStrip
              onDateSelected={(data) => console.log(data)}
              daySelectionAnimation={{
                type: "border",
                duration: 300,
                borderWidth: 1,
                borderHighlightColor: color.orange,
              }}
              customDatesStyles={customDatesStyles}
              scrollable
              style={styles.containerCalendar}
              calendarHeaderStyle={styles.calendarHeaderStyle}
              // markedDates={useMemo(() => allDates, [allDates])}
              markedDates={allDates}
            />
          ) : null}
        </View>
      </View>
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: color.orange }}
        style={styles.tabBar}
        renderIcon={({ route }) => (
          <Ionicons
            name={route.key === "first" ? "logo-rss" : "stopwatch"}
            color={color.orange}
            size={20}
          />
        )}
        renderLabel={({ route }) => <Text style={{ color: "#696969" }}>{route.title}</Text>}
      />
    </View>
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width }}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  containerAllElements: {
    backgroundColor: color.orange,
    width: "100%",
    height: 260,
    minHeight: 140,
  },
  containerCalendar: {
    height: 120,
    paddingTop: 0,
    width,
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginBottom: 3,
    marginTop: 50,
    backgroundColor: "white",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  calendarHeaderStyle: {
    color: color.orange,
    marginBottom: 0,
    paddingBottom: 0,
    marginTop: 10,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 35,
  },
  tabBar: {
    backgroundColor: "#F3F2F2",
    color: "#333",
    shadowColor: "#000",
    elevation: 0,
  },
});

export default CompteMesEvenements;

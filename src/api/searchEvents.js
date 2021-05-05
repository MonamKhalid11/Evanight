import { useContext, useState } from "react";
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";
import AuthContext from "../context/AuthContext";
import AuthSearch from "../context/SearchContext";
import { log } from "./hostToken";

const useGetAllEvents = () => {
  const { user } = useContext(AuthContext);
  const { location, setLocation } = useContext(AuthSearch);
  const [errGeoLoc, setErrGeoLoc] = useState(false);
  const [errorFetchData, setErrorFetchData] = useState("");
  const [results, setResults] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [delta, setDelta] = useState({
    longitudeDelta: 12,
    latitudeDelta: 12,
  }); // Milieu de la france par défault dézoomé et si geoloc ok alors zoom sur région

  const startWatching = async () => {
    try {
      const { status } = await requestPermissionsAsync();
      if (status !== "granted") {
        setErrGeoLoc(true);
      }
      const userLocation = await getCurrentPositionAsync();
      console.log("showing values here for userloaction",userLocation)
      setLocation(userLocation);
      setErrGeoLoc(false);
      setDelta({ longitudeDelta: 0.3, latitudeDelta: 0.3 });
    } catch (err) {
      setErrGeoLoc("Merci d'autoriser la géolocalisation.");
    }
  };

  const searchApi = async ({ when, eventApi, term, date_start, date_end, filter }) => {
    setRefreshing(true);
    try {
      const params = {
        event: term,
        jours: when,
        genre: eventApi,
        start_time: date_start,
        end_time: date_end,
        sortby: filter,
      };

      const {
        data: { data: response },
      } = await log(user.token).get("/api/events", { params });

      if (response) {
        response.map((result)=>{
                  console.log("showing values for resposne to get events are ",result.genre)

        })
        setResults(response);
        setErrorFetchData("");
        setRefreshing(false);
      }
    } catch (err) {
      setErrorFetchData("Merci de vérifier votre connexion internet");
    }
  };
  return {
    searchApi,
    results,
    errorFetchData,
    refreshing,
    startWatching,
    location,
    setLocation,
    delta,
    errGeoLoc,
  };
};
export default useGetAllEvents;

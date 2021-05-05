import { Alert } from "react-native";

export const alertGeoLoc = (errGeoLoc, startWatching) =>
  setTimeout(() => {
    if (errGeoLoc) {
      Alert.alert(
        "Autorisation",
        "Merci d'autoriser la géolocalisation afin de profiter de toutes les fonctionnalités.",
        [
          {
            text: "Annuler",
            onPress: () => console.log("Annuler"),
            style: "Annuler",
          },
          { text: "OK", onPress: () => startWatching() },
        ],
        { cancelable: false }
      );
    }
  }, 1000);

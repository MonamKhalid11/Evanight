import getDirections from "react-native-google-maps-directions";

export const directionToEvent = (currentAddress, item) => {
  // map une fois qu'on appuie sur la distance
  const data = {
    source: {
      latitude: currentAddress.coords.latitude,
      longitude: currentAddress.coords.longitude,
    },
    destination: {
      latitude: item.latitude,
      longitude: item.longitude,
    },
    params: [
      {
        key: "travelmode",
        value: item.distance < 5 ? "walking" : "driving", // "walking", "bicycling" "transit"
      },
      {
        key: "dir_action",
        // value: "navigate", // Démarre automatiquement le trajet quand activé
      },
    ],
  };
  getDirections(data);
};

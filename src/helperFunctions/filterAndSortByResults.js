import getDistance from "geolib/es/getDistance";
import convertDistance from "geolib/es/convertDistance";

export const filterAndSortByResults = (results, location, callback) => {  
  const resultsWithLocation = results.filter((element) => element.latitude > 0); // Permet de garder que les résultats qui contiennent une adresse pour les Markers
  const finalResults = resultsWithLocation.map((item) => {
    const distance = getDistance(
      {
        // latitude: location.coords.latitude, // current location of the user
        // longitude: location.coords.longitude,
         latitude: 48.83870845, // moked to france location of the user
        longitude: 2.37876662,
      },
      { latitude: item.latitude, longitude: item.longitude } // Location of the event
    );
    const convertedDistance = convertDistance(distance, "km");
    item.distance = convertedDistance; // append the distance to the object
    return item;
  });
  if (callback) {
    finalResults.sort((a, b) => a.distance - b.distance);
  }

  return finalResults;
};

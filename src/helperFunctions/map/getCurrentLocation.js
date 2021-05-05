export const getCurrentLocation = ({ location, _map }) =>
  _map.current.animateToRegion(
    {
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    },
    1000
  );

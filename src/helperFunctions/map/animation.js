let mapIndex = 0;

export const animationOnScroll = ({ finalResults, CARD_WIDTH, mapAnimation, _map }) =>
  mapAnimation.addListener(({ value }) => {
    let index = Math.floor(value / (CARD_WIDTH + 10)); // why + 10 ?! who knows
    if (index >= finalResults.length) {
      index = finalResults.length + 1;
    }
    if (index <= 0) {
      index = 0;
    }
    clearTimeout(regionTimeOut);

    const regionTimeOut = setTimeout(() => {
      if (mapIndex !== index) {
        mapIndex = index;
        const { latitude, longitude } = finalResults[index];
        _map.current.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          },
          350
        );
      }
    }, 10);
  });

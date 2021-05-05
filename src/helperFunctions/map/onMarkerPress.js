export const onMarkerPress = ({
  index,
  marker,
  setModalVisible,
  setIdentiquesId,
  finalResults,
  bs,
  _scrollView,
}) => {
  const sameAddress = finalResults.map((item) => {
    if (marker.latitude === item.latitude && marker.longitude === item.longitude) {
      index++;
      return {
        id: item.id,
        title: item.title,
        date: item.start_time,
      };
    }
  });
  const filteredSameAddresses = sameAddress.filter((item) => item !== undefined);

  if (filteredSameAddresses.length > 1) {
    setModalVisible(true);
    setIdentiquesId(filteredSameAddresses);
  } else {
    _scrollView.current.scrollToIndex({ index: index - 1, animated: true });
    bs.current.snapTo(1);
  }
};

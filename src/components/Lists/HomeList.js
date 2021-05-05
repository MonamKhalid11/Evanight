import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import ButtonSeeAll from "../Buttons/ButtonSeeAll";

const HomeLists = ({ results, refreshing, functionOnRefresh, renderItem, filter, textTitle }) => {
  // participants / ratings
  // data : finalResultsParticipants // finalResultsRatings
  // onRefresh : searchApiParticipants / searchApiRatings({ filter: filter })}
  const getItemLayout = () => (data, index) => ({
    length: 300,
    offset: 300 * index,
    index,
  });
  return (
    <View>
      <Text style={styles.textTitle}>{textTitle}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 15 }}
        horizontal
        keyExtractor={(results) => results.id.toString()}
        data={results}
        refreshing={refreshing}
        onRefresh={() => functionOnRefresh({ filter: filter })}
        getItemLayout={getItemLayout()}
        renderItem={renderItem}
      />
      <ButtonSeeAll filter="participants" />
    </View>
  );
};
const styles = StyleSheet.create({
  textTitle: {
    paddingLeft: 15,
    marginBottom: 20,
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
});

export default HomeLists;

import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { pickImage, takeAPhoto } from "../../../../helperFunctions/Account/SelectPhoto";
import { color } from "../../../../constants/color";

export const BottomSheetPickup = ({ bs, infoUser, user, setUser }) => {
  return (
    <View style={styles.containerRenderBottomSheet}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
      <View>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.panelTitle}>Photo de profil</Text>
          <Text style={styles.panelSubtitle}>Choisis ta photo de profil</Text>
        </View>
        <Pressable
          onPressOut={() => takeAPhoto({ bs, user, infoUser, setUser })}
          style={styles.panelButton}
        >
          <Text style={styles.panelButtonTitle}>Prendre une photo</Text>
        </Pressable>
        <Pressable
          onPressOut={() => pickImage({ bs, user, setUser, infoUser })}
          style={styles.panelButton}
        >
          <Text style={styles.panelButtonTitle}>Choisir depuis la gallerie</Text>
        </Pressable>
        <Pressable style={styles.panelButton} onPressOut={() => bs.current.snapTo(1)}>
          <Text style={styles.panelButtonTitle}>Annuler</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerRenderBottomSheet: {
    backgroundColor: "#F6F6F6",
    marginTop: 32,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 0.5,
    borderTopColor: "#00000040",
    paddingHorizontal: 17,
    paddingVertical: 10,
  },

  panelHeader: {
    alignItems: "center",
    marginTop: 15,
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 10,
    marginHorizontal: 30,
    borderRadius: 10,
    backgroundColor: color.orange,
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,

    color: "white",
  },
});

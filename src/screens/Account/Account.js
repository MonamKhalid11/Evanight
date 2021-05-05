import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ProfilePicture from "../../components/Header/ProfilePicture";
import RowSettings from "./RowSettings";
import GradientProfile from "../../components/BackGround/GradientProfile";
import AuthContext from "../../context/AuthContext";

const Account = ({ navigation }) => {
  const { user, signOut, setUser } = useContext(AuthContext);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <GradientProfile>
        <Text style={styles.textHeader}>Mon profil</Text>
        <ProfilePicture />
        <Text style={styles.pseudoText}>{user?.infoUser?.pseudo}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <RowSettings
            additionalStyling={{ marginBottom: 30 }}
            text="Mes évènements"
            nameIcon="calendar"
            stylingBackground={{ backgroundColor: "#FFF3E3" }}
            onPress={() => navigation.navigate("AccountMyEvents")}
          />
          <RowSettings
            additionalStyling={{ marginBottom: 30 }}
            stylingBackground={{ backgroundColor: "#FFF3E3" }}
            text="Mes abonnements"
            nameIcon="logo-rss"
          />
          <RowSettings
            additionalStyling={{ marginBottom: 30 }}
            stylingBackground={{ backgroundColor: "#FFF3E3" }}
            text="Mes amis"
            nameIcon="people"
          />

          <View style={styles.line} />

          <RowSettings
            additionalStyling={{ marginBottom: 30 }}
            stylingBackground={{ backgroundColor: "#FFF3E3" }}
            text="Paramètres"
            nameIcon="settings"
            onPress={() => navigation.navigate("Parametres")}
          />
          <RowSettings
            text="Se déconnecter"
            stylingBackground={{ backgroundColor: "#FFF3E3" }}
            nameIcon="log-out"
            onPress={() => {
              signOut(setUser, () => navigation.navigate("Connexion"));
            }}
          />
        </ScrollView>
      </GradientProfile>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  line: {
    marginHorizontal: 20,
    backgroundColor: "#DDDDDD",
    height: 1,
    marginBottom: 30,
  },
  pseudoText: {
    position: "relative",
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 14,
    marginBottom: 25,
  },
  textHeader: {
    justifyContent: "center",
    position: "absolute",
    color: "#fff",
    alignSelf: "center",
    top: "5%",
    fontSize: 23,
    zIndex: 2,
  },
});

export default Account;

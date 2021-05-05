/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HeaderLog from "../components/BackGround/HeaderLog";
import OrangeButton from "../components/Buttons/OrangeButton";
import AuthContext from "../context/AuthContext";
import InputLine from "../components/Separator/InputLine";
import Spacer from "../components/Separator/Spacer";
import LineAuth from "../components/Separator/LineAuth";

const SignIn = ({ navigation }) => {
  const { signIn, signInWithGoogleAsync, setUser, setEventsLiked } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderLog TextLog="Connexion" />
        <View style={styles.contenu}>
          <Spacer />
          <Spacer />
          <InputLine
            nameIcon="mail"
            placeHolderText="Email"
            autoCompType="email"
            currentValue={email}
            setState={setEmail}
          />

          <InputLine
            nameIcon="key"
            placeHolderText="Mot de passe"
            autoCompType="password"
            secure
            currentValue={password}
            setState={setPassword}
          />
          {error ? <Text style={styles.messageError}>{error}</Text> : null}
          <View style={styles.containerText}>
            <TouchableOpacity>
              <Text style={styles.TextOublie}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
          </View>
          <Spacer />

          <OrangeButton
            TextButton="Se connecter"
            functionToCall={() => {
              signIn({
                email,
                password,
                setError,
                setUser,
                setEventsLiked,
              });
            }}
          />
          <LineAuth />
          <OrangeButton
            TextButton="Se connecter avec google"
            functionToCall={() => signInWithGoogleAsync({ setError, setUser, setEventsLiked })}
          />

          <Spacer />

          <View style={styles.SwitchSignUp}>
            <Text style={{ paddingRight: 10 }}>Pas encore inscrit ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Inscription")}>
              <Text
                style={{
                  textTransform: "uppercase",
                  color: "#FF9100",
                  fontWeight: "bold",
                }}
              >
                S'enregistrer
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
    flex: 1,
  },
  contenu: { marginHorizontal: 25 },
  containerText: {
    flexDirection: "row",
    alignSelf: "center",
    width: 400,
    justifyContent: "flex-end",
    marginHorizontal: 45,
  },
  TextOublie: {
    marginRight: 25,
  },
  SwitchSignUp: {
    flexDirection: "row",
    justifyContent: "center",
  },
  messageError: {
    textAlign: "center",
    color: "red",
    paddingHorizontal: 20,
  },
});

export default SignIn;

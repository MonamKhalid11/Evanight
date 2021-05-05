import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HeaderLog from "../components/BackGround/HeaderLog";
import InputLine from "../components/Separator/InputLine";
import Spacer from "../components/Separator/Spacer";
import OrangeButton from "../components/Buttons/OrangeButton";
import LineAuth from "../components/Separator/LineAuth";
import AuthContext from "../context/AuthContext";

const SignUp = ({ navigation }) => {
  const { signUp, signInWithGoogleAsync, setUser, setEventsLiked } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [error, setError] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderLog TextLog="S'inscrire" />
        <View style={{ marginHorizontal: 25 }}>
          <Spacer />
          <Spacer />

          <InputLine
            nameIcon="person"
            placeHolderText="Pseudo"
            autoCompType="username"
            currentValue={pseudo}
            setState={setPseudo}
          />
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
          <InputLine
            nameIcon="key"
            placeHolderText="Confirmer le mot de passe"
            autoCompType="password"
            secure
            currentValue={confirmPassword}
            setState={setConfirmPassword}
          />

          {error ? <Text style={styles.messageError}>{error}</Text> : null}

          <Spacer />
          <OrangeButton
            functionToCall={() => {
              signUp({
                email,
                pseudo,
                password,
                confirmPassword,
                setError,
                setUser,
              });
            }}
            TextButton="S'inscrire"
          />

          <LineAuth />
          <OrangeButton
            functionToCall={() => signInWithGoogleAsync({ setError, setUser, setEventsLiked })}
            TextButton="S'inscrire avec Google"
          />
          <Spacer />

          <View style={styles.SwitchSignUp}>
            <Text style={{ paddingRight: 10, paddingBottom: 15 }}>Déjà membre ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Connexion")}>
              <Text style={styles.textSwitch}>se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  BlockLog: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F8F8",
  },
  container: {
    backgroundColor: "#F8F8F8",
    flex: 1,
  },
  SwitchSignUp: {
    flexDirection: "row",
    justifyContent: "center",
  },
  textSwitch: {
    textTransform: "uppercase",
    color: "#FF9100",
    fontWeight: "bold",
  },
  messageError: {
    textAlign: "center",
    color: "red",
    paddingHorizontal: 20,
  },
});

export default SignUp;

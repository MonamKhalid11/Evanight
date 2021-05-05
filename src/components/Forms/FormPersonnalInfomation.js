import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FormPersonnalInfomation = ({
  state: { email, setEmail, setErr, setPhoneNumber, setShowButtonApply, user, phone_number },
}) => {
  return (
    <>
      <View>
        <Text style={styles.titleCategorie}>Nom d&apos;utilisateur</Text>
        <TextInput
          editable={false}
          style={styles.inputText}
          placeholder={user.infoUser.pseudo}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View>
        <Text style={styles.titleCategorie}>Adresse email</Text>
        <TextInput
          editable
          style={styles.inputText}
          autoCapitalize="none"
          autoCompleteType="email"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={(mail) => {
            setEmail(mail);
            setShowButtonApply(true);
            setErr(false);
          }}
          value={email}
        />
      </View>

      <Text style={styles.titleCategorie}>Numéro de téléphone</Text>

      <TextInput
        style={styles.inputText}
        placeholder="Numéro de téléphone"
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="tel"
        keyboardType="phone-pad"
        maxLength={10}
        onChangeText={(number) => {
          setPhoneNumber(number);
          setShowButtonApply(true);
          setErr(false);
        }}
        value={phone_number}
      />
      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 6 }}>
        <Ionicons
          size={25}
          name="information-circle-outline"
          color="grey"
          style={{ marginLeft: 15 }}
        />
        <Text style={{ marginLeft: 5 }}>Permet de retrouver vos amis plus facilement</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputText: {
    backgroundColor: "white",
    maxWidth: 400,
    marginHorizontal: 17,
    paddingHorizontal: 0,
    paddingVertical: 2,
    marginBottom: 5,
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
  },
  titleCategorie: {
    paddingBottom: 4,
    paddingTop: 15,
    paddingLeft: 15,
    fontWeight: "bold",
  },
});

export default FormPersonnalInfomation;

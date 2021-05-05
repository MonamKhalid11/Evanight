import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import GradientProfile from "../../../../components/BackGround/GradientProfile";
import ButtonEditProfileImage from "../../../../components/Buttons/ButtonEditProfileImage";
import GoBackAccount from "../../../../components/Buttons/GoBackAccount";
import ProfilePicture from "../../../../components/Header/ProfilePicture";
import { color } from "../../../../constants/color";
import { BottomSheetPickup } from "./BottomSheetPickup";
import AuthContext from "../../../../context/AuthContext";
import FormPersonnalInfomation from "../../../../components/Forms/FormPersonnalInfomation";

const InfoPerso = () => {
  const {
    updateInfoPerso,
    user,
    user: { infoUser },
    setUser,
  } = useContext(AuthContext);

  const [phone_number, setPhoneNumber] = useState(infoUser.phone_number);
  const [email, setEmail] = useState(infoUser.email);
  const [showButtonApply, setShowButtonApply] = useState(false);
  const [err, setErr] = useState(false);
  const didMount = useRef(false);

  useEffect(() => {
    // avoid to start function on first render
    if (didMount.current) {
      (async function asyncStorage() {
        await AsyncStorage.setItem("infoUser", JSON.stringify(infoUser));
      })();
    } else {
      didMount.current = true;
    }
  }, [infoUser]);

  let bs = React.createRef();

  return (
    <View style={{ borderColor: "white", flex: 1 }}>
      <GradientProfile>
        <GoBackAccount />
        <Text style={styles.textHeader}>Informations personnelles</Text>
        <ProfilePicture />
        <Text style={styles.pseudoText}>{user?.infoUser?.pseudo}</Text>
        <ButtonEditProfileImage onPressEditPhoto={() => bs.current.snapTo(0)} />
        <BottomSheet
          ref={bs}
          snapPoints={[330, 0]}
          renderContent={() => BottomSheetPickup({ bs, infoUser, user, setUser })}
          initialSnap={1}
          enabledGestureInteraction
        />
        <FormPersonnalInfomation
          state={{
            user,
            setEmail,
            setShowButtonApply,
            setErr,
            email,
            setPhoneNumber,
            phone_number,
          }}
        />

        {err && <Text style={{ marginTop: 30, color: "red", alignSelf: "center" }}>{err}</Text>}
        {showButtonApply && (
          <TouchableOpacity
            delayLongPress="40"
            onLongPress={() =>
              updateInfoPerso({
                email,
                phone_number,
                user,
                setUser,
                infoUser,
                setErr,
              })
            }
            style={styles.containerAppliquerBouton}
          >
            <Text style={styles.textAppliquerBouton}>Appliquer</Text>
          </TouchableOpacity>
        )}
      </GradientProfile>
    </View>
  );
};

const styles = StyleSheet.create({
  containerAppliquerBouton: {
    backgroundColor: color.orange,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    borderRadius: 20,
    maxWidth: 205,
    marginTop: 50,
  },
  textAppliquerBouton: {
    color: "white",
    paddingHorizontal: 10,
    fontSize: 18,
    justifyContent: "center",
    paddingVertical: 8,
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
    fontSize: 20,
    zIndex: 2,
  },
});

export default InfoPerso;

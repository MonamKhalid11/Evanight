import { Image, StyleSheet } from "react-native";
import { baseURL } from "../../api/hostToken";
import AuthContext from "../../context/AuthContext";
import React, { useContext, useMemo } from "react";

const ProfilePicture = () => {
  const { user } = useContext(AuthContext);
  const defaultImage = `${baseURL}/profiles_images/default.png`;
  const profilePicture = useMemo(() => user.infoUser.image_profile, [user.infoUser.image_profile]);
  return <Image style={styles.imageProfil} source={{ uri: profilePicture || defaultImage }} />;
};

const styles = StyleSheet.create({
  imageProfil: {
    width: 110,
    height: 110,
    borderRadius: 110,
    alignSelf: "center",
    position: "absolute",
    top: "15%",
    borderColor: "white",
    borderWidth: 4,
  },
});

export default ProfilePicture;

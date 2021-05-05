/* eslint-disable no-unused-vars */
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-google-app-auth";
import { log } from "../api/hostToken";

const AuthContext = React.createContext();

export const signIn = async ({ email, password, setUser, setError, setEventsLiked }) => {
  if (!email || !password) {
    return setError("Merci de renseigner tous les champs");
  }
  try {
    const response = await log().post("/api/login", { email, password });

    if (response) {
      const { token } = response.data;
      const { id, email, pseudo, image_profile, phone_number } = response.data.data;
      setUser({
        loggedIn: true,
        token,
        infoUser: {
          id,
          email,
          pseudo,
          image_profile,
          phone_number,
        },
      });

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem(
        "infoUser",
        JSON.stringify({
          id,
          email,
          pseudo,
          image_profile,
          phone_number,
        })
      );

      const id_user = response.data.data.id;

      const likedEvents = await log(token).get(`/api/retrieveOnlyLikedEvents?id_user=${id_user}`);

      if (likedEvents.data.length > 0) {
        setEventsLiked(likedEvents.data);
      }
    }
  } catch (err) {
    const { response } = err;
    const { request, ...errorObject } = response;
    const message = errorObject.data;
    setError(message);
  }
};

export const signUp = async ({ email, pseudo, password, confirmPassword, setError, setUser }) => {
  if (!email || !password || !pseudo || !confirmPassword) {
    return setError("Merci de renseigner tous les champs.");
  }
  if (password !== confirmPassword) {
    return setError("Les mots de passe ne sont pas identiques.");
  }
  try {
    const response = await log().post("/api/signup", {
      email,
      pseudo,
      password,
    });

    if (response) {
      const { token } = response.data;
      const { id, email, pseudo } = response.data.data;
      await AsyncStorage.setItem("infoUser", JSON.stringify(response.data.data));
      await AsyncStorage.setItem("token", token);
      setUser({
        loggedIn: true,
        token,
        infoUser: id,
        email,
        pseudo,
      });
    }
  } catch (err) {
    const { response } = err;
    const { request, ...errorObject } = response;
    const message = errorObject.data;
    setError(message);
  }
};

export async function signInWithGoogleAsync({ setError, setUser, setEventsLiked }) {
  try {
    const result = await Google.logInAsync({
      androidClientId: "349412922049-789aedm18ce2suhf4iblnlqnaq09rrp2.apps.googleusercontent.com",
      iosClientId: "349412922049-7h8o3l014efpvdp3e7g0h4fqmtdla94b.apps.googleusercontent.com",
      scopes: ["profile", "email"],
    });

    if (result.type === "success") {
      try {
        const response = await log().post("/api/loginwithgoogle", {
          email: result.user.email,
          pseudo: result.user.name,
          image_profile: result.user.photoUrl,
          google_idToken: result.idToken,
        });
        const { token } = response.data;
        await AsyncStorage.setItem("token", token);

        const { id, email, pseudo, image_profile, phone_number } = response.data.data;

        await AsyncStorage.setItem(
          "infoUser",
          JSON.stringify({
            id,
            email,
            pseudo,
            image_profile,
            phone_number,
          })
        );
        const likedEvents = await log(token).get(`/api/retrieveOnlyLikedEvents?id_user=${id}`);

        if (likedEvents.data.length > 0) {
          setEventsLiked(likedEvents.data);
        }

        setUser({
          loggedIn: true,
          token,
          infoUser: {
            id,
            email,
            pseudo,
            image_profile,
            phone_number,
          },
        });
      } catch (err) {
        const { response } = err;
        const { request, ...errorObject } = response;
        const message = errorObject.data;
        setError(message);
      }
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
}

export const updateInfoPerso = async ({ email, phone_number, user, setUser, infoUser, setErr }) => {
  if (phone_number.length < 10) {
    return setErr("Le numéro de téléphone doit contenir 10 caractères");
  }
  try {
    await log(user.token).post(
      `/api/update/infoPerso?id=${user.infoUser.id}&email=${email}&phone_number=${phone_number}`
    );
    setUser({ ...user, infoUser: { ...infoUser, email, phone_number } });
  } catch (err) {
    setErr("Quelque chose ne s'est pas passé comme prévu.");
  }
};

export const signOut = async (setUser) => {
  AsyncStorage.removeItem("token");
  AsyncStorage.removeItem("infoUser");
  setUser({ loggedIn: false });
};

export default AuthContext;

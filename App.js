import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { MenuProvider } from "react-native-popup-menu";
import { log } from "./src/api/hostToken";
import Splash from "./src/components/Splash";
import { color } from "./src/constants/color";
import AuthContext, {
  signIn,
  signInWithGoogleAsync,
  signOut,
  signUp,
  updateInfoPerso,
} from "./src/context/AuthContext";
import { ProviderSearch } from "./src/context/SearchContext";
import { BottomTabScreens } from "./src/navigation/BottomTabScreens";
import AccountMyEvents from "./src/screens/Account/AccountMyEvents";
import AccountSettings from "./src/screens/Account/AccountSettings";
import Notifications from "./src/screens/Account/Parameters/Notifications";
import PersonnalInformation from "./src/screens/Account/Parameters/PersonnalInformation/PersonnalInformation";
import DetailsEvents from "./src/screens/DetailsEvents";
import SignIn from "./src/screens/SignIn";
import SignUp from "./src/screens/SignUp";

const AuthStack = createStackNavigator();

export default function Auth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ loggedIn: false });

  const [eventsLiked, setEventsLiked] = useState([]);
  const state = {
    setUser,
    user,
    signUp,
    signIn,
    updateInfoPerso,
    signOut,
    signInWithGoogleAsync,
    eventsLiked,
    setEventsLiked,
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 700);
    (async function getAndVerifyToken() {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        const decoded = jwt_decode(token);
        if (decoded.exp) {
          let infoUser = await AsyncStorage.getItem("infoUser");
          infoUser = JSON.parse(infoUser);
          setUser({ loggedIn: true, token, infoUser });
          const id_user = decoded.infoUser.id;
          const likedEvents = await log(token).get(
            `/api/retrieveOnlyLikedEvents?id_user=${id_user}`
          );
          if (likedEvents.data.length > 0) {
            setEventsLiked(likedEvents.data);
          }
        }
      }
    })();
  }, []);

  if (loading) {
    return <Splash />;
  }

  return (
    <MenuProvider>
      <ProviderSearch>
        <AuthContext.Provider value={state}>
          <NavigationContainer>
            <AuthStack.Navigator
              screenOptions={{
                cardStyle: {
                  backgroundColor: "#fff",
                },
                headerStyle: {
                  backgroundColor: color.orange,
                },
                headerTintColor: "#fff",
              }}
            >
              {!user.loggedIn ? (
                <>
                  <AuthStack.Screen
                    name="Inscription"
                    component={SignUp}
                    unmountOnBlur
                    options={{ headerShown: false, unmountOnBlur: true }}
                  />

                  <AuthStack.Screen
                    name="Connexion"
                    component={SignIn}
                    unmountOnBlur
                    options={{ headerShown: false, unmountOnBlur: true }}
                  />
                </>
              ) : (
                <>
                  <AuthStack.Screen
                    name="Tabs"
                    component={BottomTabScreens}
                    unmountOnBlur
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="DetailsEvents"
                    component={DetailsEvents}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="InfoPerso"
                    component={PersonnalInformation}
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="Parametres"
                    component={AccountSettings}
                    unmountOnBlur
                    options={{ headerShown: false }}
                  />
                  <AuthStack.Screen
                    name="AccountMyEvents"
                    component={AccountMyEvents}
                    unmountOnBlur
                    options={{ headerShown: false, title: "" }}
                  />
                  <AuthStack.Screen
                    name="Notifications"
                    component={Notifications}
                    unmountOnBlur
                    options={{ headerShown: false, title: "" }}
                  />
                </>
              )}
            </AuthStack.Navigator>
          </NavigationContainer>
        </AuthContext.Provider>
      </ProviderSearch>
    </MenuProvider>
  );
}

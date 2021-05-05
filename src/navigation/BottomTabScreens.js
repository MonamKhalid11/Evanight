import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Account from "../screens/Account/Account";
import Cart from "../screens/Cart/Cart";
import Home from "../screens/Home/Home";
import Search from "../screens/Search";

const BottomTab = createBottomTabNavigator();
export const BottomTabScreens = () => (
  <BottomTab.Navigator
    screenOptions={({ route }) => ({
      // eslint-disable-next-line react/display-name
      tabBarIcon: ({ color }) => {
        let iconName;

        if (route.name === "Accueil") {
          iconName = "home";
        } else if (route.name === "Rechercher") {
          iconName = "search";
        } else if (route.name === "Carte") {
          iconName = "map-outline";
        } else if (route.name === "Compte") {
          iconName = "person";
        }

        return <Ionicons name={iconName} size={28} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: "#FF9100",
      inactiveTintColor: "#C9C9C9",
      keyboardHidesTabBar: true,
      style: {
        padding: 10,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      },
    }}
  >
    <BottomTab.Screen name="Accueil" component={Home} />
    <BottomTab.Screen name="Rechercher" component={Search} />
    <BottomTab.Screen name="Carte" component={Cart} />
    <BottomTab.Screen
      name="Compte"
      component={Account}
      options={{ unmountOnBlur: true }}
      unmountOnBlur
    />
  </BottomTab.Navigator>
);

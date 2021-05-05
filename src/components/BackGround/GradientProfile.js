import React from "react";
import Svg, { Ellipse, Defs, LinearGradient, Stop } from "react-native-svg";

const GradientProfile = ({ children }) => {
  // const navigation = useNavigation();

  return (
    <>
      <Svg style={{ top: "-7%", position: "relative", marginBottom: 0 }} height="30%" width="100%">
        <Defs>
          <LinearGradient id="grad" x1="1" y1="1" x2="1" y2="0">
            <Stop offset="0" stopColor="#FFB85C" stopOpacity="1" />
            <Stop offset="1" stopColor="#FE9000" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Ellipse cx="50%" cy="50%" rx="60%" ry="50%" fill="url(#grad)" />
      </Svg>
      {children}
    </>
  );
};

//const styles = StyleSheet.create({});

export default GradientProfile;

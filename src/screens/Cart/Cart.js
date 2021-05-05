import React, { useEffect, useState, useMemo, useContext, useCallback } from "react";
import { View, StyleSheet, Dimensions, Image, Animated, Pressable, Platform ,FlatList ,TouchableHighlight} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import "moment/locale/fr";
// import { FlatList } from "react-native-gesture-handler";
import BottomSheet from "@gorhom/bottom-sheet";
import useGetAllEvents from "../../api/searchEvents";
import PanneauSliderRecherche from "./SliderSearch/PanneauSliderRecherche";
import { filterAndSortByResults } from "../../helperFunctions/filterAndSortByResults";
import SearchContext from "../../context/SearchContext";
import ModalCart from "../../components/Modals/ModalCart";
import ItemListCart from "./CardsMap";
import { onMarkerPress } from "../../helperFunctions/map/onMarkerPress";
import { getCurrentLocation } from "../../helperFunctions/map/getCurrentLocation";
import { animationOnScroll } from "../../helperFunctions/map/animation";
import { IMAGES } from "../../constants/images";
// import { markersToShow, testPin } from "../../helperFunctions/map/markerToShow";

const {
  IMAGES_MAP: {
    UTILS: { BUTTON_LOCATION },
    MARKERS: { CLUB: CLRMAKER ,CONCERT:CNMARKER ,BAR:BRMARKER , FESTIVAL:FVFESTIVAL},
  },
} = IMAGES;
const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height * 0.42;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Carte = () => {
  const { searchApi, results, startWatching, location, delta } = useGetAllEvents();
  const [modalVisible, setModalVisible] = useState(false);
  const [identiquesId, setIdentiquesId] = useState([]);
  const { when, eventApi, date1, date2 } = useContext(SearchContext);
  const [selectedMarkerIndex,setSelectedMarkerIndex] = useState(null)

  useEffect(() => {
    searchApi({ when, eventApi, undefined, date1, date2 });
    startWatching();
  }, []);

  const finalResults = useMemo(() => filterAndSortByResults(results, location, "callback"), [
    results,
  ]);

  const onPressMarker = (e, index) =>{
    setSelectedMarkerIndex(index)
}
  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);
  const bs = React.useRef(null); // bottomsheet
  const snapPoints = useMemo(() => [0, "50%"], []); // bottomsheet
  const mapAnimation = new Animated.Value(0);

  useEffect(() => {
    animationOnScroll({ finalResults, CARD_WIDTH, mapAnimation, _map });
  }, [mapAnimation]);

 

  const interpolations = finalResults.map((marker, index) => {
    const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH];
    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });
    return { scale };
  });

  const renderItem = useCallback(
    ({ item }) => <ItemListCart item={item} CARD_HEIGHT={CARD_HEIGHT} CARD_WIDTH={CARD_WIDTH} />,
    []
  );

  const customMarkers = (marker ,index,scaleStyle)=>{
    if(marker.genre == 'Concert') {
      return(
        <Image source={CNMARKER} style={[selectedMarkerIndex === index ? styles.markerTapped : styles.marker, scaleStyle]} resizeMode="cover" />
      )
    }
    else if(marker.genre == 'Festival'){
      return(
        <Image source={FVFESTIVAL} style={[selectedMarkerIndex === index ? styles.markerTapped : styles.marker, scaleStyle]} resizeMode="cover" />
      )
    }
    else if(marker.genre == 'Bar'){
      return(
        <Image source={BRMARKER} style={[selectedMarkerIndex === index ? styles.markerTapped : styles.marker, scaleStyle]} resizeMode="cover" />
      )
    }
    else if(marker.genre == 'Club'){
      return(
        <Image source={CLRMAKER} style={[selectedMarkerIndex === index ? styles.markerTapped : styles.marker, scaleStyle]} resizeMode="cover" />
      )
    }
   
  }
  return (
    <View>
      <MapView.Animated
        onPress={() => bs.current.snapTo(0)}
        ref={_map}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          longitudeDelta: delta.longitudeDelta,
          latitudeDelta: delta.latitudeDelta,
        }}
        initialRegion={{
          latitude: 46.227638,
          longitude: 2.213749,
          longitudeDelta: 12,
          latitudeDelta: 12,
        }}
        style={styles.map}
        showsUserLocation
        showsMyLocationButton={false}
        showsCompass
        enableZoomControl
        provider={PROVIDER_GOOGLE}
      >
       
        {finalResults.map((marker, index) => {
          console.log(interpolations[index].scale);
          const scaleStyle = {
            transform: [
              {
                scale: 1, // interpolations[index].scale.scale,
              },
            ],
          };
          return (
          <Marker
          key={`marker-${index}`}
          coordinate={{
            latitude: marker.latitude ? marker.latitude : 0,
            longitude: marker.longitude ? marker.longitude : 0,
          }}
          onPress={(e) => {
            onPressMarker(e, index)
            onMarkerPress({
              index,
              marker,
              setModalVisible,
              setIdentiquesId,
              finalResults,
              bs,
              _scrollView,
            })
          }}        
         tracksViewChanges={true}

          >
                <View key={marker.id} style={[styles.markerWrap, scaleStyle]} >
                  {customMarkers(marker,index,scaleStyle)}
                </View>
          </Marker>

          //Previous Markers rendered
            // <Marker
            //   key={marker.id}
            //   calloutOffset={{ x: 0, y: 0 }}
            //   pinColor="blue"
            //   coordinate={{
            //     latitude: marker.latitude ? marker.latitude : 0,
            //     longitude: marker.longitude ? marker.longitude : 0,
            //   }}
            //   onPress={() => {
            //     onMarkerPress({
            //       index,
            //       marker,
            //       setModalVisible,
            //       setIdentiquesId,
            //       finalResults,
            //       bs,
            //       _scrollView,
            //     });
            //   }}
            //   tracksViewChanges={false}
            // >
            //   {console.log("showing values here at markers are ",marker)}
            //   <View style={[styles.markerWrap, scaleStyle]}>
            //     <Image source={PINCLUB} style={[styles.marker, scaleStyle]} resizeMode="cover" />
            //   </View>
            // </Marker>
          );
        })}
      </MapView.Animated>

      <View style={styles.positionBoutonFiltre}>
        <PanneauSliderRecherche searchApi={searchApi} />
      </View>
      <Pressable
        style={styles.buttonCurrentPositionContainer}
        onPress={() => getCurrentLocation({ location, _map })}
      >
        <Image onPress style={styles.buttonCurrentPosition} source={BUTTON_LOCATION} />
      </Pressable>

      <BottomSheet
        ref={bs}
        containerHeight={height}
        index={0}
        snapPoints={snapPoints}
        style={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        backgroundComponent={null}
      >
        <AnimatedFlatList
          data={finalResults}
          keyExtractor={(results) => results.id.toString()}
          ref={_scrollView}
          horizontal
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          initialNumToRender={2}
          getItemLayout={(data, index) => ({
            length: CARD_WIDTH + 20,
            offset: (CARD_WIDTH + 20) * index,
            index,
          })}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          contentContainerStyle={{
            paddingHorizontal: Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
          }}
          renderItem={renderItem}
        />
      </BottomSheet>
      <ModalCart
        setModalVisible={setModalVisible}
        bs={bs}
        modalVisible={modalVisible}
        identiquesId={identiquesId}
        _scrollView={_scrollView}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    height: "100%",
    width: "100%",
  },
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    padding: 15,
    width: 150,
  },
  titre: {
    fontSize: 16,
    marginBottom: 5,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  image: {
    width: 120,
    height: 80,
  },
  date: {
    color: "red",
  },
  positionBoutonFiltre: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -2,
    alignSelf: "center",
    alignItems: "center",
  },
  buttonCurrentPositionContainer: {
    position: "absolute",
    right: 10,
    bottom: 15,
  },

  buttonCurrentPosition: {
    height: 130,
    width: 130,
  },

  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 45,
  },
  marker: {
    width: 29,
    height: 42,
  },
  markerTapped: {
    width: 29,
    height: 52,
  },
  separatorLigne: {
    marginHorizontal: 10,
    width: "100%",
    borderColor: "#F1F1F1",
    borderWidth: 0.5,
    alignSelf: "center",
    marginVertical: 8,
  },
  // Nouveau bottomsheet
  contentContainerStyle: {
    padding: 0,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHandle: {
    width: 40,
    height: 5,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 4,
  },
  containerText: {
    alignContent: "center",
  },
  containerIcon: {
    justifyContent: "center",
    alignContent: "center",
  },
});

export default Carte;

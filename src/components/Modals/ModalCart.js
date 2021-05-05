import React from "react";
import {
  View,
  Modal,
  ScrollView,
  Pressable,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const ModalCart = ({ setModalVisible, bs, modalVisible, identiquesId, _scrollView }) => (
  <Modal animationType="slide" transparent visible={modalVisible}>
    <ScrollView>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={{ position: "absolute", top: 15, right: 15 }}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close-outline" size={30} color="gray" />
          </TouchableOpacity>
          <Text style={styles.titleModal}>Plusieurs évènements à la même adresse</Text>
          {identiquesId.map((item, index) => (
            <View key={index}>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                  bs.current.snapTo(1);
                  _scrollView.current.scrollToIndex({
                    index,
                    animated: true,
                  });
                }}
              >
                <View>
                  <Text style={{ fontWeight: "bold" }} id={index}>
                    {item.title}
                  </Text>
                  <Text>{item.date}</Text>
                </View>
              </Pressable>
              <View style={styles.ligneIntersectionModal} />
            </View>
          ))}
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text
              style={{
                fontWeight: "bold",
                alignSelf: "center",
                marginTop: 20,
              }}
            >
              Fermer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </Modal>
);
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  backgroundIconFlatlist: {},
  containerIconFlatlist: {},
  titleModal: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 15,
    marginBottom: 35,
    textDecorationLine: "underline",
  },
  ligneIntersectionModal: {
    width: width * 0.8,
    borderColor: "lightgrey",
    borderWidth: 0.5,
    alignSelf: "center",
    marginVertical: 8,
  },
});

export default ModalCart;

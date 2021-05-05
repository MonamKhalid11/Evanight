import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { log, baseURL } from "../../api/hostToken";

export const pickImage = async ({ bs, user, setUser, infoUser }) => {
  const token = user.token;
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    return alert("Merci d'autoriser l'accès aux photos.");
  }
  bs.current.snapTo(1);
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
  });

  if (!result.cancelled) {
    const resizeResult = await ImageManipulator.manipulateAsync(
      result.uri,
      [{ resize: { height: 400, width: 400 } }],
      { format: "jpeg", compress: 0.7 }
    );

    const formData = new FormData();
    formData.append("profile", {
      uri: resizeResult.uri,
      name: "profile_photo.jpg",
      type: "image/png" || "image/jpeg",
    });
    try {
      const fetched = await log(token, "callback").post(
        `/api/update/profilePicture?id=${user.infoUser.id}`,
        formData
      );
      if (fetched) {
        let uri = fetched.data.uri;
        setUser({ ...user, infoUser: { ...infoUser, image_profile: baseURL + uri } });
      }
    } catch (e) {
      console.log(e);
    }
  }
};

export const takeAPhoto = async ({ bs, user, infoUser, setUser }) => {
  const token = user.token;
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted") {
    alert("Merci d'autoriser l'accès à la caméra.");
  }
  bs.current.snapTo(1);
  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
  });
  if (!result.cancelled) {
    const resizeResult = await ImageManipulator.manipulateAsync(
      result.uri,
      [{ resize: { height: 400, width: 400 } }],
      { format: "jpeg", compress: 0.7 }
    );
    const formData = new FormData();
    formData.append("profile", {
      uri: resizeResult.uri,
      name: "profile_photo.jpg",
      type: "image/png" || "image/jpeg",
    });
    try {
      const fetched = await log(token, "callback").post(
        `/api/update/profilePicture?id=${user.infoUser.id}`,
        formData
      );
      if (fetched) {
        let uri = fetched.data.uri;
        setUser({ ...user, infoUser: { ...infoUser, image_profile: baseURL + uri } });
      }
    } catch (e) {
      console.log(e);
      // Rajouter erreur
    }
  }
};

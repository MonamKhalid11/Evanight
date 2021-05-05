import { log } from "./hostToken";

export const getUserInfo = async ({ user, setEmail, setPhoneNumber }) => {
  const token = user.token;
  const id_user = user.infoUser.id;
  // console.log(id_user);
  try {
    const {
      data: { email, image_profile, phone_number },
    } = await log(token).get(`/api/getInfoPerso?user_id=${id_user}`);
    setEmail(email);
    setPhoneNumber(phone_number);
    //setImage(image_profile);
    //setImage(`${baseURL}/profiles_images/${fetched.data.filename}`);
  } catch (err) {
    // console.log(err);
  }
};

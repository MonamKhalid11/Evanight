import { IMAGES } from "../constants/images";

const {
  IMAGES_HEADER: { BAR, CONCERT, FESTIVAL, CLUB },
} = IMAGES;

export const imageToDisplay = (item) => {
  switch (item.genre) {
    case "Festival":
      return FESTIVAL;
    case "Concert":
      return CONCERT;
    case "Club":
      return CLUB;
    case "Bar":
      return BAR;
  }
};

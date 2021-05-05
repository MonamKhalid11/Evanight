import { IMAGES } from "../../constants/images";

const {
  IMAGES_MAP: {
    MARKERS: { BAR, FESTIVAL, CLUB, CONCERT },
  },
} = IMAGES;

export const markersToShow = (marker) => {
  switch (marker.genre) {
    case "Festival":
      return FESTIVAL;
    case "Bar":
      return BAR;
    case "Club":
      return CLUB;
    case "Concert":
      return CONCERT;
    default:
      return;
  }
};

export const testPin = (marker) => {
  switch (marker.genre) {
    case "Bar":
      return "blue";
    case "Festival":
      return "green";
    case "Club":
      return "yellow";
    case "Concert":
      return "black";
    default:
      return FESTIVAL;
  }
};

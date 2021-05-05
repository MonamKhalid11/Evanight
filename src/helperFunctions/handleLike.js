import { log } from "../api/hostToken";

export const likedEvents = async (item, setEventsLiked, eventsLiked, user) => {
  const { token } = user;
  // Si event déjà présent, supprime dans async storage et sur le serveur // Sinon ajoute au state + requete ajout serveur
  if (eventsLiked.includes(item.id)) {
    setEventsLiked(eventsLiked.filter((e) => e !== item.id));
    await log(token).delete(
      `/api/users_events_liked_delete?id_events=${item.id}&id_user=${user.infoUser.id}`
    );
  } else {
    setEventsLiked([...eventsLiked, item.id]);
    await log(token).post(
      `/api/users_events_liked?id_events=${item.id}&id_user=${user.infoUser.id}`
    );
  }
};

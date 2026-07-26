import API from "./api";

export const saveFavorite = async (
  userId: number,
  tipId: number
) => {
  return API.post("/favorites", {
    user_id: userId,
    tip_id: tipId,
  });
};

export const removeFavorite = async (
  userId: number,
  tipId: number
) => {
  return API.delete("/favorites", {
    data: {
      user_id: userId,
      tip_id: tipId,
    },
  });
};

export const getFavorites = async (
  userId: number
) => {
  return API.get(`/favorites/${userId}`);
};
export const checkFavorite = (
    userId: number,
    tipId: number
) => {

    return API.get("/favorites/check", {
        params: {
            user_id: userId,
            tip_id: tipId,
        },
    });

};
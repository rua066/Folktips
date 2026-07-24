import axios from "axios";

const API = "http://127.0.0.1:5000/favorites";

export const saveFavorite = async (
  userId: number,
  tipId: number
) => {
  return axios.post(API, {
    user_id: userId,
    tip_id: tipId,
  });
};

export const removeFavorite = async (
  userId: number,
  tipId: number
) => {
  return axios.delete(API, {
    data: {
      user_id: userId,
      tip_id: tipId,
    },
  });
};

export const getFavorites = async (
  userId: number
) => {
  return axios.get(`${API}/${userId}`);
};
export const checkFavorite = (
    userId: number,
    tipId: number
) => {

    return axios.get(`${API}/check`, {
        params: {
            user_id: userId,
            tip_id: tipId,
        },
    });

};
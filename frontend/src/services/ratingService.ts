import axios from "axios";

const API = "http://127.0.0.1:5000/ratings";

export const getRating = async (tipId: number) => {

    const res = await axios.get(`${API}/${tipId}`);

    return res.data;

};

export const saveRating = async (

    userId: number,

    tipId: number,

    rating: number

) => {

    return axios.post(API, {

        user_id: userId,

        tip_id: tipId,

        rating,

    });

};
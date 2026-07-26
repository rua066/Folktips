import API from "./api";

export const getRating = async (tipId: number) => {
    const res = await API.get(`/ratings/${tipId}`);
    return res.data;
};

export const saveRating = async (
    userId: number,
    tipId: number,
    rating: number
) => {
    return API.post("/ratings", {
        user_id: userId,
        tip_id: tipId,
        rating,
    });
};
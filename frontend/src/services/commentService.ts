import API from "./api";

export const getComments = async (tipId: number) => {
    const response = await API.get(`/comments/${tipId}`);
    return response.data;
};

export const addComment = async (
    userId: number,
    tipId: number,
    content: string
) => {
    return API.post("/comments", {
        user_id: userId,
        tip_id: tipId,
        content,
    });
};
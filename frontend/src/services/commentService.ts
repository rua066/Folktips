import axios from "axios";

const API = "http://127.0.0.1:5000/comments";

export const getComments = async (tipId: number) => {

    const response = await axios.get(`${API}/${tipId}`);

    return response.data;

};

export const addComment = async (

    userId: number,

    tipId: number,

    content: string

) => {

    return axios.post(API, {

        user_id: userId,

        tip_id: tipId,

        content,

    });

};
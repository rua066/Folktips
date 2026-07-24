import API from "./api";

export const getAllTips = async (
    page: number = 1,
    limit: number = 6
) => {

    const response = await API.get(
        `/tips?page=${page}&limit=${limit}`
    );

    return response.data;

};
export const getTipById = async (id: number) => {
  const response = await API.get(`/tips/${id}`);

  return response.data;
};
export const createTip = async (tip: any) => {
  const response = await API.post("/tips", tip);

  return response.data;
};
export const deleteTip = async (id: number) => {
  const response = await API.delete(`/tips/${id}`);

  return response.data;
};
export const updateTip = async (id: number, tip: any) => {
    const response = await API.put(`/tips/${id}`, tip);

    return response.data;
};
export const searchTips = async (keyword: string) => {

    const response = await API.get(`/tips/search?keyword=${keyword}`);

    return response.data;

};
export const getTipsByCategory = async (categoryId: number) => {

    const response = await API.get(`/tips/category/${categoryId}`);

    return response.data;

};
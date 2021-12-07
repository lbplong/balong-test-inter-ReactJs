import axiosPort from "../AxiosPort";
const LikeAPI = {
  getModel: (params) => {
    const url = "/liked/model";
    return axiosPort.get(url, { headers: params });
  },
  addLike: (params, id) => {
    const url = `/liked/add-like?id=${id}`;
    return axiosPort.put(url, params);
  },
};
export default LikeAPI;

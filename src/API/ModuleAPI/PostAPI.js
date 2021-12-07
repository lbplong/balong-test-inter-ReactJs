import axiosPort from "../AxiosPort";

const PostAPI = {
  getDefaultListItems: (params) => {
    const url = "/post/list";
    return axiosPort.get(url, { headers: params });
  },
  getTotalPage: (params) => {
    const url = "/post/count";
    return axiosPort.get(url, { headers: params });
  },
  updatePostLike: (params, id) => {
    const url = `/post/update-like?id=${id}`;
    return axiosPort.put(url, params);
  },
};
export default PostAPI;

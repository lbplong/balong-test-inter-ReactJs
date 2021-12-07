import axiosPort from "../AxiosPort";

const AccountAPI = {
  login: (params) => {
    const url = "/public/login";
    return axiosPort.post(url, params);
  },
  getAccountByToken: (params) => {
    const url = "/account/token";
    return axiosPort.get(url, { headers: params });
  },
  register: (params) => {
    const url = "/public/register";
    return axiosPort.post(url, params);
  },
};

export default AccountAPI;

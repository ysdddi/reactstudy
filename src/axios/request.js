import axios from "axios";

export const SERVER = "https://api.nexon.co.kr/fifaonline4";

// API request 모듈
const request = async (url, method, headers = {}, jsonData) => {
  const Address = SERVER + "/" + url;
  try {
    if (method === "get") {
      const { data } = await axios({
        method: method,
        url: Address,
        headers: {
          ...headers,
          "content-type": "application/json",
        },
        params: jsonData,
      });
      return data;
    } else {
      const { data } = await axios({
        method: method,
        url: Address,
        headers: {
          ...headers,
          "content-type": "application/json",
        },
        data: jsonData,
      });
      return data;
    }
  } catch (error) {
    console.log("request function error", error, url);
    await Promise.reject(error);
  }
};
// 사용법
// request('/State/serverState', 'get');
export default request;
import extractOperatorId from "../../utils/extractOperatorId";
import { AxiosInstance } from "axios";
import { clear, getAccessToken } from "../tokenStorage";

const authInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    async (config) => {
      const operatorId = extractOperatorId();
      const token = await getAccessToken();

      config.headers.Authorization = `Bearer ${token}`;

      if (operatorId) {
        config.headers!["operatorId"] = operatorId;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default authInterceptor;

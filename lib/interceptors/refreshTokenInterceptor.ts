import axios, { AxiosInstance } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  hasAccessToken,
  hasRefreshToken,
  setAccessToken,
} from "../../lib/tokenStorage";
import decodeAccessToken from "../../utils/decodeAccessToken";

interface RefreshTokenResponse {
  authenticated: true;
  accessToken: string | null;
}

const refreshTokenInterceptor = (instance: AxiosInstance) => {
  const fetchRefreshToken = async (): Promise<string | null> => {
    const accessToken = await getAccessToken();
    const refreshToken = await getRefreshToken();

    if (!accessToken || !refreshToken) {
      return null;
    }

    const tokenData = decodeAccessToken(accessToken);

    const response = await instance.post<RefreshTokenResponse>(
      "/users/refreshToken",
      {
        email: tokenData["email"],
        refreshToken,
      }
    );

    if (
      response.status === 200 &&
      response.data.authenticated &&
      response.data.accessToken
    ) {
      return response.data.accessToken;
    }

    return null;
  };

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      const shouldRefreshToken =
        error.response.status === 401 &&
        !originalRequest.retry &&
        hasAccessToken() &&
        hasRefreshToken();

      if (!shouldRefreshToken) {
        return Promise.reject(error);
      }

      originalRequest.retry = true;

      const accessToken = await fetchRefreshToken();

      if (!accessToken) {
        return Promise.reject(error);
      }

      await setAccessToken(accessToken);

      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      return instance(originalRequest);
    }
  );
};

export default refreshTokenInterceptor;

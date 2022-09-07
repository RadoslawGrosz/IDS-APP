import AsyncStorage from "@react-native-async-storage/async-storage";

const RefreshTokenKey = "refreshToken";
const AccessTokenKey = "token";

const setAccessToken = (accessToken: string) => {
  AsyncStorage.setItem(AccessTokenKey, accessToken);
};

const setRefreshToken = (refreshToken: string) => {
  AsyncStorage.setItem(RefreshTokenKey, refreshToken);
};

const getRefreshToken = () => {
  return AsyncStorage.getItem(RefreshTokenKey);
};

const getAccessToken = () => {
  return AsyncStorage.getItem(AccessTokenKey);
};

const hasAccessToken = () => {
  return !!getAccessToken();
};

const hasRefreshToken = () => {
  return !!getRefreshToken();
};

const clear = () => {
  AsyncStorage.removeItem(RefreshTokenKey);
  AsyncStorage.removeItem(AccessTokenKey);
};

export {
  setAccessToken,
  getAccessToken,
  setRefreshToken,
  getRefreshToken,
  hasAccessToken,
  hasRefreshToken,
  clear,
};

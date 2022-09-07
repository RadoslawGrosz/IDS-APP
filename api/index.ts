import { ApiBaseUrl } from "../consts";
import axios from "axios";
import { authInterceptor, refreshTokenInterceptor } from "../lib/interceptors";

const client = axios.create({
  baseURL: ApiBaseUrl,
});

authInterceptor(client);
refreshTokenInterceptor(client);

export { client };

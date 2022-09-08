import { ApiBaseUrl } from "../consts";
import axios from "axios";
import { authInterceptor, refreshTokenInterceptor } from "../lib/interceptors";

const client = axios.create({
  baseURL: "https://bogmar.ids.i4b.pl/api",
});

authInterceptor(client);
refreshTokenInterceptor(client);

export { client };

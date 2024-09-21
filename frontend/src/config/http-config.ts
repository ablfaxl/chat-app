import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../utils/constants";

export const http = axios.create({
  baseURL: `${BASE_URL}/api/`,
  withCredentials: true,
});

export type { AxiosResponse };

import axios, { AxiosInstance } from "axios";

export const axiosClient: AxiosInstance = axios.create({
  baseURL: "https://be-classroom-app.vercel.app/",
  headers: { "Content-Type": "application/json" },
});

export const axiosClientRefresh: AxiosInstance = axios.create({
  baseURL: "https://be-classroom-app.vercel.app/",
  headers: { "Content-Type": "application/json" },
});

export interface BaseResponsePagination {
  status: string;
  message: string;
  pagination: {
    page: number;
    limit: number;
    pageSize: number;
    total_page: number;
  };
}

export interface BaseResponseSuccess {
  status: string;
  message: string;
  data?: any;
}

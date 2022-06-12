import axios from "axios";
import { getCookie } from "cookies-next";

import config from "../config";

const API = axios.create({
  baseURL: config.SERVER_URL,
  timeout: 2500,
});

API.interceptors.request.use(req => {
  if (getCookie("loginData")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(getCookie("loginData")).accessToken
    }`;
  }

  return req;
});

API.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    if (err.response.status === 401) window.location.href = "/login";

    return Promise.reject(err);
  },
);

export const login = userInfo => API.post("/api/login", userInfo);

export const getRecentSites = async userId => {
  const { data } = await API.get(`/api/users/${userId}/sites`);

  return data;
};

export const createArticle = (userId, article) =>
  API.post(`/api/users/${userId}/articles`, { ...article });

export const getArticleList = userId =>
  API.get(`/api/users/${userId}/articles`);
export const getArticle = (userId, articleId) =>
  API.get(`/api/users/${userId}articles/${articleId}`);

export const updateArticle = (userId, articleId, article) =>
  API.put(`/api/users/${userId}articles/${articleId}`, { ...article });
export const updateLastVisitedSite = (userId, articleId, lastVisitedSiteUrl) =>
  API.patch(`/api/users/${userId}articles/${articleId}`, {
    lastVisitedSiteUrl,
  });

export const deleteArticle = (userId, articleId) =>
  API.delete(`/api/users/${userId}articles/${articleId}`);

import axios from "axios";
import createApiMethod from "./createApiMethod";
import {
  ListAnimeStatus,
  ListAnimeResponse,
  UserAnimeResponse,
} from "../interfaces/ListAnimeTypes";

const BASE_URL: string = createApiMethod("ListAnime");
const BASE_URL_GUEST: string = createApiMethod("ListAnimeGuest");
const empty: string = "";

const ListAnime = async (
  isGuest: boolean,
  sort: string,
  genre: string,
  type: string,
  status: ListAnimeStatus,
  count: number,
  skip: number,
  name: string,
  onlyNew: boolean,
  hasVideo: boolean,
  translation: string,
  genreBan: string,
  isWeb: boolean
): Promise<ListAnimeResponse[]> => {
  return await axios
    .get(
      `${
        isGuest ? BASE_URL_GUEST : BASE_URL
      }?sort=${sort}&genre=${genre}&type=${type}&status=${status}&count=${count}&skip=${skip}&name=${name}&onlyNew=${onlyNew}&hasVideo=${hasVideo}&translation=${translation}&genreBan=${genreBan}&isWeb=${isWeb}`
    )
    .then((response) => response.data);
};

const ListAnimeDefault = async (
  lang: "ru" | "en" = "ru"
): Promise<ListAnimeResponse[]> => {
  return await ListAnime(
    true,
    "popularity",
    empty,
    "ova,tv,movie",
    "anons",
    10,
    0,
    empty,
    false,
    false,
    lang,
    empty,
    true
  );
};

const ListAnimeById = async (
  userId: number,
  userState: "completed" | "plantowatch" | "banned",
  lang: "ru" | "en" = "ru"
): Promise<UserAnimeResponse[]> => {
  return await axios
    .get(
      `${BASE_URL}?sort=&genre=&type=ova,tv,movie&status=released,ongoing,anons&count=50&skip=0&name=&userId=${userId}&userState=${userState}&userOrder=latest&genreBan=`
    )
    .then((response) => response.data);
};

export { ListAnime, ListAnimeDefault, ListAnimeById };

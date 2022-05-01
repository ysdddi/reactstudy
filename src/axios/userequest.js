/* eslint-disable */
import request from "./request";
export const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiOTA2MTA3OTE1IiwiYXV0aF9pZCI6IjIiLCJ0b2tlbl90eXBlIjoiQWNjZXNzVG9rZW4iLCJzZXJ2aWNlX2lkIjoiNDMwMDExNDgxIiwiWC1BcHAtUmF0ZS1MaW1pdCI6IjUwMDoxMCIsIm5iZiI6MTY0ODQ0NDA4NSwiZXhwIjoxNjYzOTk2MDg1LCJpYXQiOjE2NDg0NDQwODV9.oDwls61Gf_bTmbjom5kIPZnc_81LCsQTfiKEU5e1hM8";

export const userSearch = async (nickname) => {
  return request(
    `users?nickname=${nickname}`,
    "get",
    { Authorization: apiKey },
    {}
  );
};

export const rankSearch = async (accessId) => {
  return request(
    `users/${accessId}/maxdivision`,
    "get",
    { Authorization: apiKey },
    {}
  );
};

export const matchSearch = async (accessId) => {
  return request(
    `users/${accessId}/matches?matchtype=50&offset=0&limit=100`,
    "get",
    { Authorization: apiKey },
    {}
  );
};

export const matchDetailSearch = async (matchId) => {
  return request(
    `matches/${matchId}`,
    "get",
    { Authorization: apiKey },
    {}
  );
};
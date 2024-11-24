import http from "./httpService";

export const loginUser = (data:any) => {
  return http.post("/user/login", data);
};

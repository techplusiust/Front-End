import http from "./httpService";

export const signupUser = (data: any) => {
  //todo
  return http.post("/user/register", data);
};

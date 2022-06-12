import { atom } from "recoil";
import { getCookie } from "cookies-next";

const loginState = atom({
  key: "loginState",
  default: getCookie("loginData") ? JSON.parse(getCookie("loginData")) : null,
});

export default loginState;

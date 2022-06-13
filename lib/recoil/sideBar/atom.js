import { atom } from "recoil";

const sideBarState = atom({
  key: "sideBar",
  default: false,
});

export default sideBarState;

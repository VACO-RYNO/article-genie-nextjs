import { atom } from "recoil";

const currentArticleIdState = atom({
  key: "currentArticleIdState",
  default: ""
});

export default currentArticleIdState;

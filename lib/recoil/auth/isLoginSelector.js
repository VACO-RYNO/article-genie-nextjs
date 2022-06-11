import { selector } from "recoil";

import loginAtom from "./atom";

const isLoginState = selector({
  key: "isLoginState",
  get: ({ get }) => {
    const loginData = get(loginAtom);

    return loginData !== null;
  },
});

export default isLoginState;

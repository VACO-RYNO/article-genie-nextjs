import { selector } from "recoil";

import sideBarAtom from "./atom";

const isSideBarState = selector({
  key: "isSideBarState",
  get: ({ get }) => {
    const isSideBarOpen = get(sideBarAtom);

    return isSideBarOpen;
  },
});

export default isSideBarState;

import { useRecoilState } from "recoil";

import modalState from "../../lib/recoil/modal/atom";
import Modal from "../Modal";

function GlobalModal() {
  const { modalType } = useRecoilState(modalState)[0] || {};

  if (modalType === "LoginModal") {
    return <Modal></Modal>;
  }

  return <></>;
}

export default GlobalModal;

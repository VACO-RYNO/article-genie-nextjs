import { useRecoilState } from "recoil";

import modalState from "../../lib/recoil/modal";
import Modal from "../Modal";
import Login from "../Login";

function GlobalModal() {
  const { modalType } = useRecoilState(modalState)[0] || {};

  if (modalType === "LoginModal") {
    return (
      <Modal>
        <Login />
      </Modal>
    );
  }

  return <></>;
}

export default GlobalModal;

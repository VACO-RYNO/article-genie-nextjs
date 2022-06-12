import { useRecoilState } from "recoil";

import modalState from "../../lib/recoil/modal";
import Modal from "../Modal";
import Login from "../Login";
import ConfirmModal from "../ConfirmModal";

function GlobalModal() {
  const { modalType, modalProps } = useRecoilState(modalState)[0] || {};

  if (modalType === "LoginModal") {
    return (
      <Modal>
        <Login />
      </Modal>
    );
  }

  if (modalType === "ProfileModal") {
    return <Modal></Modal>;
  }

  if (modalType === "ConfirmModal") {
    return <ConfirmModal>{modalProps.message}</ConfirmModal>;
  }

  if (modalType === "UrlInvalidModal") {
    return <ConfirmModal>{modalProps.message}</ConfirmModal>;
  }

  return <></>;
}

export default GlobalModal;

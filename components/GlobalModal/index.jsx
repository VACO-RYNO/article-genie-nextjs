import { useRecoilState } from "recoil";

import modalState from "../../lib/recoil/modal";
import Modal from "../Modal";
import Login from "../Login";
import ErrorModal from "../ErrorModal";

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
    return <Modal>{modalProps.message}</Modal>;
  }

  if (modalType === "UrlInvalidModal") {
    return <ErrorModal>{modalProps.message}</ErrorModal>;
  }

  return <></>;
}

export default GlobalModal;

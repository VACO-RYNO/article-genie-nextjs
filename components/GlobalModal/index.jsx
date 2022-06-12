import { useRecoilValue } from "recoil";

import modalState from "../../lib/recoil/modal";
import Modal from "../Modal";
import Login from "../Login";
import ConfirmModal from "../ConfirmModal";
import ProfileModal from "../ProfileModal";
import Profile from "../Profile";

function GlobalModal() {
  const { modalType, modalProps } = useRecoilValue(modalState) || {};

  switch (modalType) {
    case "LoginModal":
      return (
        <Modal>
          <Login />
        </Modal>
      );
    case "ProfileModal":
      return (
        <ProfileModal>
          <Profile />
        </ProfileModal>
      );
    case "ConfirmModal":
      return <ConfirmModal>{modalProps.message}</ConfirmModal>;
  }
}

export default GlobalModal;

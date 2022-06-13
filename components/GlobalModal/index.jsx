import { useRecoilValue } from "recoil";

import modalState from "../../lib/recoil/modal";
import Modal from "../Modal";
import Login from "../Login";
import ConfirmModal from "../ConfirmModal";
import ProfileModal from "../ProfileModal";
import Profile from "../Profile";
import MyArticlesModal from "../MyArticlesModal";
import MyArticlesList from "../MyArticlesList";

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
    case "MyArticlesModal":
      return (
        <MyArticlesModal>
          <MyArticlesList />
        </MyArticlesModal>
      );
    case "ConfirmModal":
      return <ConfirmModal>{modalProps.message}</ConfirmModal>;
  }
}

export default GlobalModal;

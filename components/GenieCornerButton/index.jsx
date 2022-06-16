import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { IoAdd } from "react-icons/io5";

import useModal from "../../lib/hooks/useModal";
import sideBarState from "../../lib/recoil/sideBar";
import { isLoginState } from "../../lib/recoil/auth";
import modalState from "../../lib/recoil/modal";
import { removeCookies } from "cookies-next";

function GenieCornerButton() {
  const [isSideBarOpen, setIsSideBarOpen] = useRecoilState(sideBarState);
  const [isActive, setIsActive] = useState(false);
  const isLogin = useRecoilValue(isLoginState);
  const modalData = useRecoilValue(modalState);
  const { showModal, hideModal } = useModal();

  const handleClick = () => {
    setIsActive(current => !current);

    if (!isLogin) {
      return showModal({
        modalType: "LoginModal",
      });
    }

    if (isSideBarOpen) {
      setIsSideBarOpen(false);
      return removeCookies("currentArticleId");
    }

    if (modalData?.modalType === "MyArticlesModal") {
      return hideModal();
    }

    return showModal({
      modalType: "MyArticlesModal",
    });
  };

  return (
    <Wrapper>
      <CornerButton onClick={handleClick}>
        <AddIcon isActive={isActive} />
      </CornerButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: block;
`;

const CornerButton = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 80px;
  height: 80px;
  border-radius: 15px;
  background-color: #7e80ff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  color: #f7f7f7;
  font-weight: 700;
  font-size: 2rem;
  z-index: 9999999;

  :hover {
    border: solid 3px #fc7ebe;
  }
`;

const AddIcon = styled(IoAdd)`
  width: 40px;
  height: 40px;
  ${props => (props.isActive ? "transform: rotate(45deg);" : "null;")}
`;

export default GenieCornerButton;

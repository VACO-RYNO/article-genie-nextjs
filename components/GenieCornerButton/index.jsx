import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";

import useModal from "../../lib/hooks/useModal";
import sideBarState from "../../lib/recoil/sideBar";
import { isLoginState } from "../../lib/recoil/auth";
import { removeCookies } from "cookies-next";

function GenieCornerButton() {
  const [isSideBarOpen, setIsSideBarOpen] = useRecoilState(sideBarState);
  const isLogin = useRecoilValue(isLoginState);

  const { showModal } = useModal();

  const handleNewArticleClick = () => {
    if (!isLogin) {
      return showModal({
        modalType: "LoginModal",
      });
    }

    if (isSideBarOpen) {
      setIsSideBarOpen(false);
      return removeCookies("currentArticleId");
    }

    return showModal({
      modalType: "MyArticlesModal",
    });
  };

  return (
    <Wrapper>
      {isSideBarOpen ? (
        <CornerButton onClick={handleNewArticleClick}>&#10006;</CornerButton>
      ) : (
        <CornerButton onClick={handleNewArticleClick}>&#43;</CornerButton>
      )}
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

export default GenieCornerButton;

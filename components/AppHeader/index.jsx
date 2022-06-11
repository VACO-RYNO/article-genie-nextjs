import styled from "styled-components";

import useModal from "../../lib/hooks/useModal";

function AppHeader() {
  const { showModal } = useModal();

  const handleLoginClick = () => {
    showModal({
      modalType: "LoginModal",
    });
  };

  return (
    <Header>
      Header! <LoginButton onClick={handleLoginClick}>Login</LoginButton>
    </Header>
  );
}

const Header = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  width: 100%;
  height: 67px;
  top: 0;
  border: 1px solid #e6e6e6;

  a {
    text-decoration: none;
    color: #000000;
  }
`;

const LoginButton = styled.button`
  position: absolute;
  right: 29px;
  width: 100px;
  height: 20px;
`;

const Brand = styled.div`
  margin-left: 10px;
  display: flex;
  align-items: center;

  h1 {
    margin-left: 10px;
    font-style: italic;
    color: #6466ff;
    font-size: 28px;
  }

  img {
    width: 60px;
    height: 41px;
  }
`;

export default AppHeader;

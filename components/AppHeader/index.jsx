import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import styled from "styled-components";
import { BsPersonCircle } from "react-icons/bs";
import logo from "../../public/images/genie-logo.png";
import Heading from "../shared/Heading";

import useModal from "../../lib/hooks/useModal";
import { isLoginState } from "../../lib/recoil/auth";

function AppHeader() {
  const { showModal } = useModal();
  const isLogin = useRecoilValue(isLoginState);
  const router = useRouter();

  const handleProfileClick = () => {
    showModal({
      modalType: "ProfileModal",
    });
  };

  const handleLoginClick = () => {
    showModal({
      modalType: "LoginModal",
    });
  };

  const handleShareButtonClick = async () => {
    if (!isLogin) {
      handleLoginClick();
      return;
    }

    await navigator.clipboard.wirteText(window.location.href);

    showModal({
      modalType: "ConfirmModal",
      modalProps: {
        message: "링크가 복사되었습니다.",
      },
    });
  };

  return (
    <>
      <Header>
        <Link href="/">
          <a>
            <Brand>
              <Image
                className="img"
                src={logo}
                alt="brand-logo"
                width={60}
                height={41}
              ></Image>
              <Heading>Genie.</Heading>
            </Brand>
          </a>
        </Link>
        {router.pathname.includes("genie-mode") && (
          <Image alt="공유 버튼" onClick={handleShareButtonClick}></Image>
        )}
        {isLogin ? (
          <ProfileIcon onClick={handleProfileClick} />
        ) : (
          <LoginButton onClick={handleLoginClick}>Login</LoginButton>
        )}
      </Header>
    </>
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
  background-color: #7e80ff;
  border: 1px solid #7e80ff;
  border-radius: 10px;
  color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 1rem;
  margin: 0;
  font-weight: 500;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  :hover {
    background-color: #6466ff;
  }
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
`;

const ProfileIcon = styled(BsPersonCircle)`
  position: absolute;
  right: 29px;
  width: 40px;
  height: 40px;
  color: #bcbcbc;
`;

export default AppHeader;

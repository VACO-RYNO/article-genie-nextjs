import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";

import styled from "styled-components";
import Heading from "../shared/Heading";
import logo from "../../public/images/genie-logo.png";
import { BsPersonCircle } from "react-icons/bs";
import { BsShareFill } from "react-icons/bs";

import useModal from "../../lib/hooks/useModal";
import { isLoginState } from "../../lib/recoil/auth";

import AddressBar from "../AddressBar";

function AppHeader() {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

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
    await navigator.clipboard.writeText(window.location.href);

    showModal({
      modalType: "ConfirmModal",
      modalProps: {
        message: "페이지 URL이 복사되었습니다.",
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
          <AddressBarWrapper>
            <AddressBar />
            <ShareIcon onClick={handleShareButtonClick} />
          </AddressBarWrapper>
        )}
        {!isSSR && isLogin ? (
          <ProfileIcon onClick={handleProfileClick} />
        ) : (
          <LoginButton onClick={handleLoginClick}>Login</LoginButton>
        )}
      </Header>
    </>
  );
}

const Header = styled.div`
  z-index: 1000;
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #ffffff;
  width: 100vw;
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

const AddressBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  margin-right: 150px;
`;

const ProfileIcon = styled(BsPersonCircle)`
  position: absolute;
  right: 29px;
  width: 40px;
  height: 40px;
  color: #bcbcbc;
`;

const ShareIcon = styled(BsShareFill)`
  width: 28px;
  height: 28px;
  color: #bcbcbc;

  :hover {
    color: #6466ff;
  }
`;

export default AppHeader;

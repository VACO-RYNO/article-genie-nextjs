import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import Image from "next/image";

import styled from "styled-components";
import { BsPersonCircle, BsShareFill } from "react-icons/bs";

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
        <InnerHeader>
          <Link href="/">
            <a>
              <Brand>
                <Image
                  className="brand-image"
                  src={"/images/genie-logo.png"}
                  alt="brand-logo"
                  width={400}
                  height={300}
                />
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
        </InnerHeader>
      </Header>
    </>
  );
}

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
  height: 67px;
  width: 100%;
  transition: margin-top 0.5s ease 0s;
  z-index: 99999;

  a {
    text-decoration: none;
    color: #000000;
  }
`;

const InnerHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  @media (min-width: 1024px) {
    margin-left: 10%;
    margin-right: 10%;
  }
  margin-left: 2%;
  margin-right: 2%;
`;

const LoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #7e80ff;
  border: 1px solid #7e80ff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  height: 2.5rem;
  width: 7rem;
  color: #f7f7f7;
  font-size: 1rem;
  font-weight: 700;

  :hover {
    background-color: #6466ff;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100px;
`;

const BrandLogo = styled.img`
  width: 100%;
`;

const AddressBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 93%;
  padding-right: 2%;
  padding-left: 2%;
`;

const ProfileIcon = styled(BsPersonCircle)`
  height: 40px;
  width: 40px;
  margin-right: 6%;
  color: #bcbcbc;
  cursor: pointer;

  :hover {
    color: #6466ff;
  }
`;

const ShareIcon = styled(BsShareFill)`
  width: 28px;
  height: 28px;
  color: #bcbcbc;
  cursor: pointer;
  margin-left: 1%;

  :hover {
    color: #6466ff;
  }
`;

export default AppHeader;

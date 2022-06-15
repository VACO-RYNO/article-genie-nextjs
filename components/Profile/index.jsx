import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import loginState from "../../lib/recoil/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { removeCookies } from "cookies-next";
import useModal from "../../lib/hooks/useModal";

function Profile() {
  const { hideModal } = useModal();
  const setLoginState = useSetRecoilState(loginState);
  const router = useRouter();

  const handleLogout = () => {
    removeCookies("loginData");
    removeCookies("currentArticleId");
    setLoginState(null);

    hideModal();

    router.push("/");
  };

  return (
    <Wrapper>
      <Link href={"/my-article"}>
        <MyArticleButton onClick={hideModal}>마이 아티클</MyArticleButton>
      </Link>
      <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  width: 200px;
  height: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  width: 82px;
  height: 30px;
  border-radius: 4px;
`;
const MyArticleButton = styled(Button)`
  background: #7e80ff;
  border: 1px solid #7e80ff;
  color: white;
`;

const LogoutButton = styled(Button)`
  background: #e6e6e6;
  border: 1px solid #e6e6e6;
  color: black;
`;

export default Profile;

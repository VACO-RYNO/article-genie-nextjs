import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import jwt_decode from "jwt-decode";
import { setCookies } from "cookies-next";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

import { login } from "../../lib/api";
import loginState from "../../lib/recoil/auth";
import config from "../../lib/config";
import useModal from "../../lib/hooks/useModal";

function Login() {
  const setLoginState = useSetRecoilState(loginState);
  const { hideModal } = useModal();

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: config.CLIENT_ID,
      callback: handleLogin,
    });

    google.accounts.id.renderButton(document.getElementById("sign-in"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const handleLogin = async response => {
    const profileObj = jwt_decode(response.credential);
    const { name, email, picture } = profileObj;
    const { data } = await login({ name, email, profileImageUrl: picture });

    setLoginState(data);
    setCookies("loginData", JSON.stringify(data));

    hideModal();
  };

  return (
    <Wrapper>
      <CloseButton onClick={hideModal} />
      <LoginTitle>Let Genie Works.</LoginTitle>
      <div id="sign-in"></div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
  align-items: center;
`;

const CloseButton = styled(IoMdClose)`
  position: absolute;
  top: 6.57%;
  left: 90.6%;
  width: 20px;
  height: 20px;
`;

const LoginTitle = styled.div`
  color: #ff5cb0;
  font-size: 36px;
`;

export default Login;

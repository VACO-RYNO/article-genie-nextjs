import ReactDom from "react-dom";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { FiAlertTriangle } from "react-icons/fi";

import useModal from "../../lib/hooks/useModal";

export default function ErrorModal({ children }) {
  const { hideModal } = useModal();

  return ReactDom.createPortal(
    <ModalOverlay onClick={hideModal}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <CloseButton onClick={hideModal} />
        <ErrorSign />
        <ErrorTitle>오류</ErrorTitle>
        <ModalMessage>{children}</ModalMessage>
      </ModalContainer>
    </ModalOverlay>,
    document.getElementById("portal"),
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 350px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 8px 30px;
  border-radius: 20px;
  z-index: 99999;
`;

const CloseButton = styled(IoMdClose)`
  position: absolute;
  top: 6.57%;
  left: 90.6%;
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ErrorSign = styled(FiAlertTriangle)`
  position: absolute;
  top: 50px;
  left: 210px;
  width: 80px;
  height: 80px;
  color: red;
`;

const ErrorTitle = styled.h2`
  margin: 150px auto 0px;
  left: 210px;
  color: red;
  font-size: 27px;
`;

const ModalMessage = styled.p`
  margin: 20px auto 10px;
  color: red;
  font-size: 25px;
`;

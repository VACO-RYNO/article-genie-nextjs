import ReactDom from "react-dom";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

import useModal from "../../lib/hooks/useModal";

export default function ConfirmModal({ children }) {
  const { hideModal } = useModal();

  return ReactDom.createPortal(
    <ModalOverlay onClick={hideModal}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        <CloseButton onClick={hideModal} />
        <ModalMessage>{children}</ModalMessage>
        <ConfirmButton onClick={hideModal}>확인</ConfirmButton>
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
  background-color: rgba(0, 0, 0, 0.7);
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

const Button = styled.button`
  width: 82px;
  height: 30px;
  border-radius: 4px;
  cursor: pointer;
`;

const ModalMessage = styled.p`
  margin: 120px auto 60px;
  color: #6466ff;
  font-size: 25px;
`;

const ConfirmButton = styled(Button)`
  margin: 50px auto;
  border: 1px solid #6466ff;
  background: #6466ff;
  color: white;
`;

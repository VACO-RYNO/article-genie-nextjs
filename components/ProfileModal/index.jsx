import ReactDom from "react-dom";
import styled from "styled-components";

import useModal from "../../lib/hooks/useModal";

export default function ProfileModal({ children }) {
  const { hideModal } = useModal();

  return ReactDom.createPortal(
    <ModalOverlay onClick={hideModal}>
      <ModalContainer onClick={e => e.stopPropagation()}>
        {children}
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
  background-color: rgba(0, 0, 0, 0);
  z-index: 99999;
`;

const ModalContainer = styled.div`
  position: absolute;
  padding: 10px 25px;
  top: 90px;
  right: -120px;
  width: 200px;
  height: 35px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background-color: #f1f5f8;
  border-radius: 20px;
  z-index: 999999;
`;

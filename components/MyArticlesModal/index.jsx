import ReactDom from "react-dom";
import styled from "styled-components";

import useModal from "../../lib/hooks/useModal";

export default function MyArticlesModal({ children }) {
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
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 99999;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 68%;
  right: 5rem;
  transform: translate(-10%, -70%);
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0px 8px 30px;
  border-radius: 20px;
  z-index: 999999;
`;

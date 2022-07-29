import Image from "next/image";
import styled from "styled-components";

function MobileDefense() {
  return (
    <Wrapper>
      <Image
        className="alert-image"
        src={"/images/genie-logo.png"}
        alt="brand-logo"
        width={200}
        height={150}
      />
      <Content>
        Not supported in mobile environment. Please run it in a desktop
        environment.
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: none;

  @media only screen and (max-width: 767px) {
    display: unset;
    position: absolute;
    z-index: 100000;
    height: 100%;
    background-color: white;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
  }
`;

const Content = styled.span`
  width: 100vw;
  text-align: center;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 23px;
  color: #7e80ff;
  border-bottom: 1px solid #f4f4f4;
  padding-bottom: 20px;
`;

export default MobileDefense;

import { RecoilRoot } from "recoil";
import styled from "styled-components";
import PropTypes from "prop-types";

import AppHeader from "../components/AppHeader";
import Container from "../components/shared/Container";
import GlobalModal from "../components/GlobalModal";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <RecoilRoot>
        <GlobalModal />
        <AppHeader />
        <Main>
          <Container>
            <Component {...pageProps} />
          </Container>
        </Main>
      </RecoilRoot>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

const Main = styled.main`
  border: 1px solid pink;
`;

export default MyApp;

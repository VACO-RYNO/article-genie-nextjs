import { RecoilRoot } from "recoil";
import styled from "styled-components";
import PropTypes from "prop-types";

import AppHeader from "../components/AppHeader";
import Container from "../components/shared/Container";
import GlobalModal from "../components/GlobalModal";
import { QueryClient, QueryClientProvider } from "react-query";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });

  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <GlobalModal />
          <AppHeader />
          <Main>
            <Container>
              <Component {...pageProps} />
            </Container>
          </Main>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

const Main = styled.main``;

export default MyApp;

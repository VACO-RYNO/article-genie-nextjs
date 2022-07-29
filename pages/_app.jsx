import { RecoilRoot } from "recoil";
import styled from "styled-components";
import PropTypes from "prop-types";

import AppHeader from "../components/AppHeader";
import Container from "../components/shared/Container";
import GlobalModal from "../components/GlobalModal";
import { QueryClient, QueryClientProvider } from "react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import GlobalStyle from "../components/shared/GlobalStyle";
import ErrorModal from "../components/ErrorModal";
import Loading from "../components/Loading";
import MobileDefense from "../components/MobileDefense";

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
          <Suspense fallback={<Loading />}>
            <ErrorBoundary
              fallbackRender={({ error }) =>
                process.env.NODE_ENV === "development" ? (
                  console.error(error)
                ) : (
                  <ErrorModal>작업에 실패했습니다.</ErrorModal>
                )
              }
            >
              <GlobalStyle />
              <GlobalModal />
              <MobileDefense />
              <AppHeader />
              <Main>
                <Container>
                  <Component {...pageProps} />
                </Container>
              </Main>
            </ErrorBoundary>
          </Suspense>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};

const Main = styled.main`
  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

export default MyApp;

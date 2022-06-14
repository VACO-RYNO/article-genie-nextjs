import { RecoilRoot } from "recoil";
import styled from "styled-components";
import PropTypes from "prop-types";

import AppHeader from "../components/AppHeader";
import Container from "../components/shared/Container";
import GlobalModal from "../components/GlobalModal";
import { QueryClient, QueryClientProvider } from "react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

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
          <Suspense fallback={<h1>Loading...</h1>}>
            <ErrorBoundary
              fallbackRender={({ error }) => <div>{error.message}</div>}
            >
              <GlobalModal />
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

const Main = styled.main``;

export default MyApp;

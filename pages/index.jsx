import { useState, useEffect, Suspense } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRecoilValue } from "recoil";

import styled from "styled-components";

import RecommendedSites from "../components/RecommendedSites";
import RecentlyViewedSites from "../components/RecentlyViewedSites";
import AddressBar from "../components/AddressBar";

import { isLoginState } from "../lib/recoil/auth";
import { ErrorBoundary } from "react-error-boundary";

export default function MainPage() {
  const isLogin = useRecoilValue(isLoginState);
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <>
      <Head>
        <title>Main</title>
        <meta name="description" content="article genie main page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<h1>Loading...</h1>}>
        <ErrorBoundary
          fallbackRender={({ error }) => <div>{error.message}</div>}
        >
          <Wrapper>
            <AddressBar />
            {!isSSR && isLogin ? <RecentlyViewedSites /> : <RecommendedSites />}
          </Wrapper>
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 200px;
`;

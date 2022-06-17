import { useState, useEffect } from "react";
import Head from "next/head";
import { useRecoilValue } from "recoil";

import styled from "styled-components";

import RecommendedSites from "../components/RecommendedSites";
import RecentlyViewedSites from "../components/RecentlyViewedSites";
import AddressBar from "../components/AddressBar";

import { isLoginState } from "../lib/recoil/auth";

export default function MainPage() {
  const isLogin = useRecoilValue(isLoginState);
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <>
      <Head>
        <title>
          Article Genie - Web Article Reading Helper | Make Your Own Notes
        </title>
        <meta
          name="description"
          content="Highlight your thoughts reading web articles, and make your own notes out of it."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.articlegenie.co/" />
        <meta
          property="og:title"
          content="Article Genie - Web Article Reading Helper | Make Your Own Notes"
        />
        <meta property="og:image" content="/images/genie-logo.png" />
        <meta property="og:site_name" content="Article Genie" />
        <meta
          property="og:description"
          content="Highlight your thoughts reading web articles, and make your own notes out of it."
        />
        <meta property="og:locale" content="en_US" />
        <link rel="icon" href="/images/genie-favicon.png" />
      </Head>
      <Wrapper>
        <AddressBar />
        {!isSSR && isLogin ? <RecentlyViewedSites /> : <RecommendedSites />}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 200px;
`;

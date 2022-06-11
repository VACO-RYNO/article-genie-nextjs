import Head from "next/head";
import Image from "next/image";
import { useRecoilValue } from "recoil";

import styled from "styled-components";

import RecommendedSites from "../components/RecommendedSites";
import RecentlyViewedSites from "../components/RecentlyViewedSites";
import AddressBar from "../components/AddressBar";

import { isLoginState } from "../lib/recoil/auth";

export default function MainPage() {
  const isLogin = useRecoilValue(isLoginState);

  return (
    <>
      <Head>
        <title>Main</title>
        <meta name="description" content="article genie main page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper>
        <AddressBar />
        {isLogin ? <RecentlyViewedSites /> : <RecommendedSites />}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 200px;
`;

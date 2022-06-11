import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";

export default function MainPage() {
  return (
    <>
      <Head>
        <title>Main</title>
        <meta name="description" content="article genie main page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrapper></Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 200px;
`;

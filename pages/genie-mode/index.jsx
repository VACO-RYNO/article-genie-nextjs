import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { useEffect } from "react";
import Head from "next/head";
import parse from "html-react-parser";
import styled from "styled-components";
import Script from "next/script";
import { getCookie, getCookies } from "cookies-next";

import GenieSideBar from "../../components/GenieSideBar";
import GenieCornerButton from "../../components/GenieCornerButton";

import useModal from "../../lib/hooks/useModal";
import sideBarState from "../../lib/recoil/sideBar";
import { isLoginState } from "../../lib/recoil/auth";
import { createRecentSite } from "../../lib/api";
import { useRouter } from "next/router";
import currentArticleIdState from "../../lib/recoil/currentArticleId/atom";
import getManipulatedDom from "../../lib/domManipulation";

export default function GenieModePage({ headString, bodyString }) {
  const { showModal } = useModal();
  const [isSideBarOpen, setIsSideBarOpen] = useRecoilState(sideBarState);
  const isLogin = useRecoilValue(isLoginState);
  const setCurrentArticleId = useSetRecoilState(currentArticleIdState);
  const parseHeadJsx = headString ? parse(headString) : "";
  const router = useRouter();

  useEffect(() => {
    if (!bodyString) {
      showModal({
        modalType: "ErrorModal",
        modalProps: {
          message: "지원하지 않는 웹페이지 입니다.",
        },
      });

      return () => router.push("/");
    }

    const currentArticleId = getCookie("currentArticleId");

    if (currentArticleId) {
      setIsSideBarOpen(true);
      setCurrentArticleId(currentArticleId);
    }
  }, []);

  useEffect(() => {
    const genieModeLinkButton = document.getElementById("genie-mode-link");
    const genieModeMemoButton = document.getElementById("genie-mode-memo");

    const handleLinkButtonClick = () => {
      showModal({
        modalType: "ConfirmModal",
        modalProps: {
          message: "링크가 클립보드에 복사되었습니다.",
        },
      });
    };

    const handleMemoButtonClick = () => {
      if (!isLogin) {
        showModal({
          modalType: "LoginModal",
        });
      } else if (!isSideBarOpen) {
        showModal({
          modalType: "MyArticlesModal",
        });
      }
    };

    genieModeLinkButton?.addEventListener("click", handleLinkButtonClick);
    genieModeMemoButton?.addEventListener("click", handleMemoButtonClick);

    return () => {
      genieModeLinkButton?.removeEventListener("click", handleLinkButtonClick);
      genieModeMemoButton?.removeEventListener("click", handleMemoButtonClick);
    };
  }, [isLogin, isSideBarOpen]);

  return (
    <GeniePageWrapper>
      <MainWrapper sideBar={isSideBarOpen}>
        <Head>
          {parseHeadJsx}
          <link
            rel="stylesheet"
            type="text/css"
            href="/stylesheets/genieStyle.css"
          />
        </Head>
        <BodyContainer dangerouslySetInnerHTML={{ __html: bodyString }} />
        <Script src="/javascript/genieScript.js" defer />
      </MainWrapper>
      <GenieSideBar />
      <GenieCornerButton />
    </GeniePageWrapper>
  );
}

export async function getServerSideProps(context) {
  const { url } = context.query;
  let { loginData } = getCookies(context);

  if (!url) return { props: { headString: null, bodyString: null } };

  try {
    const { data } = await axios.get(url, {
      timeout: 2500,
    });

    const sourceDomain = url.slice(`https://`.length).split("/").shift();
    const { headString, bodyString } = getManipulatedDom(data, sourceDomain);

    if (loginData) {
      loginData = JSON.parse(loginData);
      await createRecentSite(loginData.data._id, url, loginData.accessToken);
    }

    return {
      props: {
        headString,
        bodyString,
      },
    };
  } catch (error) {
    return { props: { headString: null, bodyString: null } };
  }
}

const GeniePageWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const MainWrapper = styled.div`
  ${props => (props.sideBar ? "flex: 0 0 60%;" : "flex: 0 0 100%;")}
  transition: all 200ms ease-in 0s;
`;

const BodyContainer = styled.div``;

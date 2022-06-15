import { useRecoilValue } from "recoil";
import axios from "axios";
import cheerio from "cheerio";
import { useEffect } from "react";
import Head from "next/head";
import parse from "html-react-parser";
import styled from "styled-components";
import Script from "next/script";
import config from "../../lib/config";

import GenieSideBar from "../../components/GenieSideBar";
import GenieCornerButton from "../../components/GenieCornerButton";

import useModal from "../../lib/hooks/useModal";
import sideBarState from "../../lib/recoil/sideBar";
import { isLoginState } from "../../lib/recoil/auth";
import { createRecentSite } from "../../lib/api";
import { getCookies } from "cookies-next";
import { useRouter } from "next/router";

export default function GenieModePage({ headString, bodyString }) {
  const { showModal } = useModal();
  const isSideBarOpen = useRecoilValue(sideBarState);
  const isLogin = useRecoilValue(isLoginState);
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

  if (!url) return { props: { headString: null, htmlString: null } };

  const sourceDomain = url.slice(`https://`.length).split("/").shift();
  const { data } = await axios.get(url, {
    timeout: 2500,
  });
  const $ = cheerio.load(data);

  let id = 1;

  $("p").each(function (i, ele) {
    $(this).attr("genie-id", `${id}`);
    id++;
  });

  if (sourceDomain !== "expressjs.com" && sourceDomain !== "www.latimes.com") {
    $(`header`).first().css("position", "sticky !important");
  }

  $("header").first().css("top", "68px !important");
  $("header").first().css("z-index", "999");

  $(`div[class="inner_header"]`).first().css("top", "68px !important");

  $(`link`).each(function (index, element) {
    if (this.attribs["href"]?.startsWith("https://")) return;

    $(this).attr("href", `https://${sourceDomain}${this.attribs["href"]}`);
  });

  $("a").each(function (index, element) {
    $(this).attr("target", "_self");
    $(this).attr("genie-link", "true");

    if (this.attribs["href"]?.startsWith("https://")) {
      $(this).attr(
        "href",
        `${config.HOST_URL}/genie-mode?url=${this.attribs["href"]}`,
      );

      return;
    }

    $(this).attr(
      "href",
      `${config.HOST_URL}/genie-mode?url=https://${sourceDomain}${this.attribs["href"]}`,
    );
  });

  $(`script`).each(function (index, element) {
    if (this.attribs["src"]?.startsWith("https://")) return;

    $(this).attr("src", `https://${sourceDomain}${this.attribs["src"]}`);
  });

  $(`img`).each(function (index, element) {
    if (this.attribs["src"]?.startsWith("https://")) return;

    if (this.attribs["src"]?.startsWith("//")) {
      $(this).attr("src", `https:${this.attribs["src"]}`);

      return;
    }

    $(this).attr("src", `https://${sourceDomain}${this.attribs["src"]}`);
    $(this).removeAttr("srcset");
  });

  $("body").append(
    `<div id="genie-hover-modal">
      <button class="modal-button" id="genie-mode-link">링크 생성</button>
      <button class="modal-button" id="genie-mode-memo">메모</button>
      <p class="hide"></p>
    </div>
   `,
  );

  if (loginData) {
    loginData = JSON.parse(loginData);
    await createRecentSite(loginData.data._id, url, loginData.accessToken);
  }

  return {
    props: {
      headString: $("head").html(),
      bodyString: $("body").html(),
    },
  };
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

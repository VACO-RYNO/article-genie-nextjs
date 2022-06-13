import { useRecoilValue } from "recoil";

import axios from "axios";
import cheerio from "cheerio";
import { useState, useEffect } from "react";
import Head from "next/head";
import parse from "html-react-parser";
import styled from "styled-components";
import Script from "next/script";

import GenieSideBar from "../../components/GenieSideBar";
import GenieCornerButton from "../../components/GenieCornerButton";

import useModal from "../../lib/hooks/useModal";
import sideBarState from "../../lib/recoil/sideBar";
import { createRecentSite } from "../../lib/api";
import { getCookies } from "cookies-next";

export default function GenieModePage({ headString, bodyString }) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const { showModal } = useModal();
  const isSideBarOpen = useRecoilValue(sideBarState);
  const parseHeadJsx = headString ? parse(headString) : "";

  const handleLinkButtonClick = () => {
    showModal({
      modalType: "ConfirmModal",
      modalProps: {
        message: "링크가 클립보드에 복사되었습니다.",
      },
    });
  };

  if (!isSSR) {
    const genieModeLinkButton = document.getElementById("genie-mode-link");

    genieModeLinkButton.addEventListener("click", handleLinkButtonClick);
  }

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
        <Script src="/javascript/genieScript.js" />
      </MainWrapper>
      <GenieSideBar />
      <GenieCornerButton />
    </GeniePageWrapper>
  );
}

export async function getServerSideProps(context) {
  const { url } = context.query;
  let { loginData } = getCookies(context);
  loginData = JSON.parse(loginData);

  if (!url) return { props: { headString: null, htmlString: null } };

  const sourceDomain = url.slice(`https://`.length).split("/").shift();
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let id = 1;

  $("p").each(function (i, ele) {
    $(this).attr("genie-id", `${id}`);
    id++;
  });

  $("header").first().css("position", "sticky !important");
  $("header").first().css("top", "67px !important");

  $(`script`).each(function (index, element) {
    if (this.attribs["src"]?.startsWith("https://")) return;

    $(this).attr("src", `https://${sourceDomain}${this.attribs["src"]}`);
  });

  $(`img`).each(function (index, element) {
    if (this.attribs["src"]?.startsWith("https://")) return;

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

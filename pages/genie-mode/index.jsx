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

export default function GenieModePage({ headString, htmlString }) {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const { showModal } = useModal();
  const isSideBarOpen = useRecoilValue(sideBarState);

  const parseHeadJsx = parse(headString);

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
        <HtmlContainer dangerouslySetInnerHTML={{ __html: htmlString }} />
        <Script src="/javascript/genieScript.js" />
      </MainWrapper>
      <GenieSideBar />
      <GenieCornerButton />
    </GeniePageWrapper>
  );
}

export async function getServerSideProps(context) {
  const { url } = context.query;

  if (!url) return { props: { headString: null, htmlString: null } };

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let id = 1;

  $("p").each(function (i, ele) {
    $(this).attr("genie-id", `${id}`);
    id++;
  });

  $("body").append(
    `<div id="genie-hover-modal">
      <button class="modal-button" id="genie-mode-link">링크 생성</button>
      <button class="modal-button" id="genie-mode-memo">메모</button>
      <p class="hide"></p>
    </div>
   `,
  );

  return {
    props: { headString: $("head").html(), htmlString: $.html() },
  };
}

const GeniePageWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const MainWrapper = styled.div`
  ${props => (props.sideBar ? "flex: 0 0 60%;" : "flex: 0 0 100%;")}
  overflow: hidden;
  overflow-y: scroll;
  transition: all 200ms ease-in 0s;
  display: flex;
  flex-direction: column;
`;

const HtmlContainer = styled.div`
  position: relative;
  padding-top: 67px;
`;

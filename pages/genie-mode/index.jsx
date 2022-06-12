import axios from "axios";
import cheerio from "cheerio";
import Head from "next/head";
import parse from "html-react-parser";

import styled from "styled-components";
import Script from "next/script";

export default function GenieModePage({ headString, htmlString }) {
  const parseHeadJsx = parse(headString);

  return (
    <>
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
    </>
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

const HtmlContainer = styled.div`
  position: relative;
  padding-top: 67px;
`;

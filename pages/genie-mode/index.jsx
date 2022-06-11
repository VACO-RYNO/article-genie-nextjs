import axios from "axios";
import cheerio from "cheerio";
import Head from "next/head";
import parse from "html-react-parser";

export default function GenieModePage({ headString, htmlString }) {
  const parseHeadJsx = parse(headString);

  return (
    <>
      <Head>{parseHeadJsx}</Head>
      <iframe
        width="100%"
        height="1000px"
        srcDoc={htmlString}
        sandbox="allow-scripts allow-modals allow-top-navigation"
        allow="clipboard-read; clipboard-write"
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { url } = context.query;

  if (!url) return { props: { htmlString: null } };

  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  let id = 1;

  $("p").each(function (i, ele) {
    $(this).attr("genie-id", `${id}`);
    id++;
  });

  $("head").append(`
  <link rel="stylesheet" type="text/css" href="/api/static/genie-style"/>`);

  $("body").append(
    `<div id="genie-hover-modal">
      <button class="modal-button" id="genie-mode-link">링크 생성</button>
      <button class="modal-button" id="genie-mode-memo">메모</button>
      <p class="hide"></p>
    </div>
   `,
  );

  $("body").append(`<script src="/api/static/genie-script"/>`);

  return {
    props: { headString: $("head").html(), htmlString: $.html() },
  };
}

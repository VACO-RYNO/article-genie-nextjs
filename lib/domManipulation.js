import cheerio from "cheerio";
import config from "./config";

const getManipulatedDom = (originHtml, sourceDomain) => {
  const $ = cheerio.load(originHtml);

  const tagList = ["p", "span", "td"];

  const applyGenieIdToTags = tag => {
    let id = 1;

    $(`${tag}`).each(function (i, ele) {
      $(this).attr("genie-id", `${tag}${id}`);
      $(this).attr("genie-tag", true);
      id++;
    });
  };

  tagList.forEach(tag => applyGenieIdToTags(tag));

  if (
    sourceDomain !== "expressjs.com" &&
    sourceDomain !== "www.latimes.com" &&
    sourceDomain !== "recoiljs.org"
  ) {
    $(`header`).first().css("position", "sticky !important");
  }

  $(`div[class="inner_header"]`).css("position", "sticky !important");

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

  return { headString: $("head").html(), bodyString: $("body").html() };
};

export default getManipulatedDom;

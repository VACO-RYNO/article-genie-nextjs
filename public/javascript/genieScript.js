const pList = document.querySelectorAll("p");
const genieModeLinkButton = document.getElementById("genie-mode-link");
const genieModeMemoButton = document.getElementById("genie-mode-memo");
const sideEditor = document.getElementById("side-editor");
const hoverModal = document.getElementById("genie-hover-modal");
const genieTag = document.querySelector("#genie-hover-modal > p");

let previousHash = "";
let previousClickEle;

if (location.hash) {
  previousHash = location.hash;
  const target = document.querySelector(
    `[genie-id="${location.hash.split("-")[2]}"]`,
  );

  if (target) {
    window.scrollTo({
      top: target.offsetTop - 100,
      behavior: "smooth",
    });

    target.classList.add("focus");
  }
}

pList.forEach(element => {
  element.addEventListener("click", e => {
    e.target.classList.remove("highlight");
    e.target.classList.add("element-click");

    if (previousClickEle) {
      previousClickEle?.classList.remove("element-click");
    }

    previousClickEle = e.target;

    hoverModal.style.left = e.pageX - 0 + "px";
    hoverModal.style.top = e.pageY - 100 + "px";
    hoverModal.classList.add("show");

    genieTag.setAttribute("genie-id", e.target.getAttribute("genie-id"));
    genieTag.innerHTML = e.target.innerHTML;
  });
});

window.addEventListener("mousemove", e => {
  pList.forEach(pElement => {
    const offset = pElement.getBoundingClientRect();

    if (
      e.y > offset.top &&
      e.y < offset.bottom &&
      !hoverModal.classList.contains("show")
    )
      return pElement.classList.add("highlight");

    pElement.classList.remove("highlight");
  });
});

genieModeLinkButton.addEventListener("click", async () => {
  const genieId = genieTag.getAttribute("genie-id");

  try {
    await navigator.clipboard.writeText(
      `${window.location.origin}${window.location.pathname}${window.location.search}#genie-id-${genieId}`,
    );
  } catch {
    alert("오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
  }

  previousClickEle?.classList.remove("element-click");
  hoverModal.classList.remove("show");
});

genieModeMemoButton.addEventListener("click", async () => {
  const copiedGenieTag = genieTag.cloneNode(true);
  const br = document.createElement("br");

  copiedGenieTag.appendChild(br);
  copiedGenieTag.classList.remove("hide");
  sideEditor.innerHTML += copiedGenieTag.outerHTML;

  previousClickEle?.classList.remove("element-click");
  hoverModal.classList.remove("show");
});

window.addEventListener("hashchange", () => {
  const target = document.querySelector(
    `[genie-id="${location.hash.split("-")[2]}"]`,
  );

  if (target) {
    window.scrollTo({
      top: target.offsetTop - 100,
      behavior: "smooth",
    });

    target.classList.add("focus");
  }

  if (previousHash) {
    const previousTarget = document.querySelector(
      `[genie-id="${previousHash.split("-")[2]}"]`,
    );
    previousTarget?.classList.remove("focus");
  }

  previousHash = location.hash;
});

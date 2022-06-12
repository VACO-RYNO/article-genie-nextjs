const pList = document.querySelectorAll("p");
const genieModeLinkButton = document.getElementById("genie-mode-link");
const hoverModal = document.getElementById("genie-hover-modal");
const genieTag = document.querySelector("#genie-hover-modal > p");

let previousHash = "";

if (location.hash) {
  previousHash = location.hash;
  const target = document.querySelector(
    `[genie-id="${location.hash.split("-")[2]}"]`,
  );

  window.scrollTo({
    top: target.offsetTop - 100,
    behavior: "smooth",
  });

  target.classList.add("focus");
}

pList.forEach(element =>
  element.addEventListener("click", e => {
    hoverModal.style.left = e.pageX - 0 + "px";
    hoverModal.style.top = e.pageY - 100 + "px";
    hoverModal.classList.add("show");

    genieTag.setAttribute("genie-id", e.target.getAttribute("genie-id"));
    genieTag.innerHTML = e.target.innerHTML;
  }),
);

window.addEventListener("mousemove", e => {
  pList.forEach(pElement => {
    const offset = pElement.getBoundingClientRect();

    if (e.y > offset.top && e.y < offset.bottom)
      return pElement.classList.add("highlight");

    pElement.classList.remove("highlight");
  });
});

genieModeLinkButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(
      `${window.location.origin}${window.location.pathname}${
        window.location.search
      }#genie-id-${genieTag.getAttribute("genie-id")}`,
    );
  } catch (error) {
    alert("오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
  }

  hoverModal.classList.remove("show");
});

window.addEventListener("hashchange", () => {
  const target = document.querySelector(
    `[genie-id="${location.hash.split("-")[2]}"]`,
  );

  window.scrollTo({
    top: target.offsetTop - 100,
    behavior: "smooth",
  });

  if (previousHash.length > 0) {
    const previousTarget = document.querySelector(
      `[genie-id="${previousHash.split("-")[2]}"]`,
    );
    previousTarget.classList.remove("focus");
  }

  target.classList.add("focus");
  previousHash = location.hash;
});

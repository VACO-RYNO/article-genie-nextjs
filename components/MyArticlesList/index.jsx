import { useSetRecoilState, useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useRouter } from "next/router";

import useModal from "../../lib/hooks/useModal";
import loginState from "../../lib/recoil/auth";
import sideBarState from "../../lib/recoil/sideBar";

import { createArticle, getArticleList } from "../../lib/api";
import MyArticleListEntry from "../MyArticleListEntry";
import currentArticleIdState from "../../lib/recoil/currentArticleId/atom";

function MyArticlesList() {
  const setIsSideBarOpen = useSetRecoilState(sideBarState);
  const setCurrentArticleId = useSetRecoilState(currentArticleIdState);
  const { hideModal, showModal } = useModal();
  const loginData = useRecoilValue(loginState);
  const userId = loginData.data._id;
  const originUrl = useRouter().query.url;

  const { data } = useQuery(
    ["getArticleList", userId],
    () => getArticleList(userId),
    {
      select: response => response.data,
    },
  );

  const handleNewArticleButtonClick = async () => {
    const initialForm = {
      title: "새 아티클",
      tag: "미분류",
      lastVisitedSiteUrl: originUrl,
    };

    try {
      await createArticle(userId, initialForm);

      hideModal();
      setIsSideBarOpen(true);
    } catch {
      showModal({
        modalType: "ErrorModal",
        modalProps: {
          message: "작업을 실패했습니다.",
        },
      });
    }
  };

  return (
    <MyArticlesWrapper>
      <NewArticleButton onClick={handleNewArticleButtonClick}>
        &#43;
      </NewArticleButton>
      {data.map(article => (
        <MyArticleListEntry
          key={article._id}
          title={article.title}
          onClick={() => {
            setCurrentArticleId(article._id);
            hideModal();
            setIsSideBarOpen(true);
          }}
        ></MyArticleListEntry>
      ))}
    </MyArticlesWrapper>
  );
}

const MyArticlesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(180px, auto);
  padding: 1.5rem;
  height: 70vh;
  overflow: hidden;
  overflow-y: scroll;
`;

const NewArticleButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid pink;
  margin: 15px;

  :hover {
    background-color: #fc7ebe;
    opacity: 0.5;
  }
`;

export default MyArticlesList;

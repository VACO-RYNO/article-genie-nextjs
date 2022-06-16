import { useSetRecoilState, useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import styled from "styled-components";
import { IoAdd } from "react-icons/io5";

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
      const { data } = await createArticle(userId, initialForm);

      setCurrentArticleId(data._id);
      hideModal();
      setIsSideBarOpen(true);
    } catch {
      showModal({
        modalType: "ErrorModal",
        modalProps: {
          message: "작업에 실패했습니다.",
        },
      });
    }
  };

  return (
    <ListWrapper>
      <ListTitle>마이 아티클</ListTitle>
      <MyArticlesWrapper>
        <NewArticleButton onClick={handleNewArticleButtonClick}>
          <AddIcon />
        </NewArticleButton>
        {data.map(article => (
          <MyArticleEntryWrapper>
            <MyArticleListEntry
              key={article._id}
              articleId={article._id}
              title={article.title}
              contents={article.contents}
              ogImgSrc={article.lastVisitedSiteOgImgSrc}
              onClick={() => {
                setCurrentArticleId(article._id);
                hideModal();
                setIsSideBarOpen(true);
              }}
            />
          </MyArticleEntryWrapper>
        ))}
      </MyArticlesWrapper>
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const ListTitle = styled.h1`
  color: #6466ff;
`;

const MyArticlesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: minmax(400px, auto);
  padding: 1.5rem;
  height: 70vh;
  padding: 1rem;
  overflow: hidden;
  overflow-y: scroll;
`;

const MyArticleEntryWrapper = styled.div``;

const NewArticleButton = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  width: 20rem;
  height: 330px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  min-height: 80px;
  box-shadow: 0 6px 10px 0 rgb(0 0 0 / 8%), 0 0 2px 0 rgb(0 0 0 / 15%);
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  overflow: hidden;

  :hover {
    transform: translateY(-5%);
  }
`;

const AddIcon = styled(IoAdd)`
  width: 40px;
  height: 40px;
`;

export default MyArticlesList;

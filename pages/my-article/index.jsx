import { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import styled from "styled-components";

import loginState from "../../lib/recoil/auth";
import sideBarState from "../../lib/recoil/sideBar";

import { getArticleList } from "../../lib/api";
import MyArticleListEntry from "../../components/MyArticleListEntry";
import currentArticleIdState from "../../lib/recoil/currentArticleId";

export default function MyArticlePage() {
  const [currentUserArticles, setCurrentUserArticles] = useState([]);
  const setIsSideBarOpen = useSetRecoilState(sideBarState);
  const setCurrentArticleId = useSetRecoilState(currentArticleIdState);
  const loginData = useRecoilValue(loginState);
  const userId = loginData?.data._id;

  const router = useRouter();

  useEffect(() => {
    const getMyArticles = async () => {
      const { data } = await getArticleList(userId);

      setCurrentUserArticles(data);
    };

    getMyArticles();
  }, [userId, getArticleList]);

  return (
    <MyArticlesWrapepr>
      {currentUserArticles?.map(article => (
        <MyArticleEntryWrapper>
          <MyArticleListEntry
            key={article._id}
            title={article.title}
            contents={article.contents}
            onClick={() => {
              setCurrentArticleId(article._id);
              setIsSideBarOpen(true);
              router.push(`/genie-mode?url=${article.lastVisitedSiteUrl}`);
            }}
          />
        </MyArticleEntryWrapper>
      ))}
    </MyArticlesWrapepr>
  );
}

const MyArticlesWrapepr = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: minmax(280px, auto);
  padding-top: 100px;
  width: 90vw;
  margin-right: auto;
  margin-left: auto;
`;

const MyArticleEntryWrapper = styled.div`
  min-width: 180px;
  min-height: 160px;
  margin: 30px;
  border-radius: 4px;
  box-shadow: 0 6px 10px 0 rgb(0 0 0 / 8%), 0 0 2px 0 rgb(0 0 0 / 15%);
  overflow: hidden;

  :hover {
    background-color: #a5e9ff;
  }
`;

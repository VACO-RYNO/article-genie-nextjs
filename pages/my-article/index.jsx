import { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import styled from "styled-components";

import loginState from "../../lib/recoil/auth";
import sideBarState from "../../lib/recoil/sideBar";

import { getArticleList } from "../../lib/api";
import MyArticleListEntry from "../../components/MyArticleListEntry";
import currentArticleIdState from "../../lib/recoil/currentArticleId";
import Head from "next/head";
import { setCookies } from "cookies-next";

export default function MyArticlePage() {
  const [currentUserArticles, setCurrentUserArticles] = useState([]);
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
    <>
      <Head>
        <title>ArticleGenie</title>
        <meta name="description" content="article genie main page" />
      </Head>
      <MyArticlesWrapper>
        {currentUserArticles?.map(article => (
          <MyArticleEntryWrapper>
            <MyArticleListEntry
              key={article._id}
              articleId={article._id}
              title={article.title}
              contents={article.contents}
              ogImgSrc={article.lastVisitedSiteOgImgSrc}
              onClick={() => {
                setCookies("currentArticleId", article._id);
                window.location.href = `/genie-mode?url=${article.lastVisitedSiteUrl}`;
              }}
              handleUserArticles={setCurrentUserArticles}
            />
          </MyArticleEntryWrapper>
        ))}
      </MyArticlesWrapper>
    </>
  );
}

const MyArticlesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: minmax(280px, auto);
  padding-top: 100px;
  width: 90vw;
  margin-right: auto;
  margin-left: auto;
`;

const MyArticleEntryWrapper = styled.div``;

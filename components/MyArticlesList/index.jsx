import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { useRouter } from "next/router";

import useModal from "../../lib/hooks/useModal";
import loginState from "../../lib/recoil/auth";
import sideBarState from "../../lib/recoil/sideBar";
import { createArticle, getArticleList } from "../../lib/api";

function MyArticlesList() {
  const setIsSideBarOpen = useSetRecoilState(sideBarState);
  const { hideModal } = useModal();
  const { data } = useRecoilValue(loginState);
  const userId = data._id;
  const originUrl = useRouter().query.url;

  useEffect(() => {
    (async () => {
      try {
        await getArticleList(userId); // endpoint 작업 이후 추가 진행
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

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
    } catch (err) {
      console.error(err);
    }
  };

  const handleSideBarClick = () => {
    hideModal();

    setIsSideBarOpen(true);
  };

  return (
    <MyArticlesWrapper>
      <NewArticleButton onClick={handleNewArticleButtonClick}>
        &#43;
      </NewArticleButton>
      <div className="temp-style-article" onClick={handleSideBarClick}>
        My Article 1
      </div>
      <div className="temp-style-article" onClick={handleSideBarClick}>
        My Article 2
      </div>
      <div className="temp-style-article" onClick={handleSideBarClick}>
        My Article 3
      </div>
      <div className="temp-style-article" onClick={handleSideBarClick}>
        My Article 4
      </div>
      <div className="temp-style-article" onClick={handleSideBarClick}>
        My Article 5
      </div>
      <div className="temp-style-article" onClick={handleSideBarClick}>
        My Article 6
      </div>
      <div className="temp-style-article" onClick={handleSideBarClick}>
        My Article 7
      </div>
      <div className="temp-style-article" onClick={handleSideBarClick}>
        My Article 8
      </div>
      <div className="temp-style-article" onClick={handleSideBarClick}>
        My Article 9
      </div>
      <div className="temp-style-article" onClick={handleSideBarClick}>
        My Article 10
      </div>
      <div className="temp-style-article" onClick={handleSideBarClick}>
        My Article 11
      </div>
      <div className="temp-style-article" onClick={handleSideBarClick}>
        My Article 12
      </div>
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

  .temp-style-article {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid pink;
    margin: 15px;
    padding: 0.8rem;

    :hover {
      background-color: #fc7ebe;
    }
  }
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

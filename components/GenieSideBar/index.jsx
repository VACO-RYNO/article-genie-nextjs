import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import sideBarState from "../../lib/recoil/sideBar";
import currentArticleIdState from "../../lib/recoil/currentArticleId/atom";
import loginState from "../../lib/recoil/auth";
import { getArticle } from "../../lib/api";

function GenieSideBar() {
  const isSideBarOpen = useRecoilValue(sideBarState);
  const currentArticleId = useRecoilValue(currentArticleIdState);
  const loginData = useRecoilValue(loginState);
  const [articleData, setArticleData] = useState({});

  useEffect(() => {
    (async () => {
      const userId = loginData?.data._id;
      const { data } = await getArticle(userId, currentArticleId);
      setArticleData(data);
    })();
  }, [loginData, currentArticleId]);

  const handleArticleSaveButtonClick = () => {};

  return (
    <SideBar sideBar={isSideBarOpen}>
      <TitleInput placeholder="아티클 제목" defaultValue={articleData.title} />
      <div id="side-editor" contentEditable="true">
        {articleData.contents}
      </div>
      <button onClick={handleArticleSaveButtonClick}>저장</button>
    </SideBar>
  );
}

const SideBar = styled.div`
  transition: all 200ms ease-in 0s;
  position: sticky;
  ${props => (props.sideBar ? "flex: 0 0 40%;" : "flex: 0 0 0px;")}
  top: 67px;
  height: calc(100vh - 67px);
  overflow: hidden scroll;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.05);

  #side-editor {
    height: 100%;
    border: none;
    padding: 2rem;
  }
`;

const TitleInput = styled.input`
  height: 40px;
`;

export default GenieSideBar;

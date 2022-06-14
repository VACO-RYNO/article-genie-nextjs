import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import styled from "styled-components";

import sideBarState from "../../lib/recoil/sideBar";
import currentArticleIdState from "../../lib/recoil/currentArticleId/atom";
import loginState from "../../lib/recoil/auth";
import { getArticle, updateArticle } from "../../lib/api";
import useModal from "../../lib/hooks/useModal";

function GenieSideBar() {
  const isSideBarOpen = useRecoilValue(sideBarState);
  const currentArticleId = useRecoilValue(currentArticleIdState);
  const loginData = useRecoilValue(loginState);
  const [articleData, setArticleData] = useState({});
  const { showModal } = useModal();

  useEffect(() => {
    (async () => {
      try {
        const userId = loginData?.data._id;
        const { data } = await getArticle(userId, currentArticleId);

        setArticleData(data);
      } catch {
        showModal({
          modalType: "ErrorModal",
          modalProps: {
            message: "데이터를 불러오는데 실패했습니다.",
          },
        });
      }
    })();
  }, [loginData, currentArticleId]);

  const handleArticleSaveButtonClick = async () => {
    try {
      const userId = loginData.data._id;

      delete articleData._id;
      await updateArticle(userId, currentArticleId, articleData);
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
    <SideBar sideBar={isSideBarOpen}>
      <TitleInput
        name="article-title"
        placeholder="아티클 제목"
        defaultValue={articleData.title}
        onChange={e => {
          setArticleData(data => {
            data.title = e.target.value;
            return data;
          });
        }}
      />
      <div
        id="side-editor"
        contentEditable="true"
        onInput={e => {
          setArticleData(data => {
            data.contents = e.target.innerHTML;
            return data;
          });
        }}
      >
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

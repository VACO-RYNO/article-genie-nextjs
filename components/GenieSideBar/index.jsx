import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import styled from "styled-components";
import { setCookies } from "cookies-next";

import sideBarState from "../../lib/recoil/sideBar";
import currentArticleIdState from "../../lib/recoil/currentArticleId/atom";
import loginState from "../../lib/recoil/auth";
import {
  getArticle,
  updateArticle,
  updateLastVisitedSite,
} from "../../lib/api";
import useModal from "../../lib/hooks/useModal";

function GenieSideBar() {
  const loginData = useRecoilValue(loginState);
  const isSideBarOpen = useRecoilValue(sideBarState);
  const currentArticleId = useRecoilValue(currentArticleIdState);
  const [articleData, setArticleData] = useState({});
  const { showModal } = useModal();
  const [isFetchDone, setIsFetchDone] = useState(false);
  const originUrl = useRouter().query.url;

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (isSideBarOpen && currentArticleId) {
          const userId = loginData?.data._id;

          setCookies("currentArticleId", currentArticleId);
          setArticleData(data => {
            const sideEditor = document.getElementById("side-editor");

            data.contents = sideEditor.innerHTML;

            return data;
          });

          delete articleData._id;

          await updateArticle(userId, currentArticleId, articleData);
          await updateLastVisitedSite(userId, currentArticleId, originUrl);
        }
      } catch {
        showModal({
          modalType: "ErrorModal",
          modalProps: {
            message: "작업을 실패했습니다.",
          },
        });
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [loginData, currentArticleId, articleData, isSideBarOpen]);

  useEffect(() => {
    (async () => {
      const userId = loginData?.data._id;

      try {
        if (isSideBarOpen && currentArticleId) {
          setIsFetchDone(false);

          const { data } = await getArticle(userId, currentArticleId);

          setArticleData(data);
          setIsFetchDone(true);
        } else if (currentArticleId) {
          setArticleData(data => {
            const sideEditor = document.getElementById("side-editor");

            data.contents = sideEditor.innerHTML;

            return data;
          });

          delete articleData._id;

          await updateArticle(userId, currentArticleId, articleData);
          await updateLastVisitedSite(userId, currentArticleId, originUrl);
        }
      } catch {
        showModal({
          modalType: "ErrorModal",
          modalProps: {
            message: "작업을 실패했습니다.",
          },
        });
      }
    })();
  }, [loginData, currentArticleId, isSideBarOpen]);

  return (
    <SideBar sideBar={isSideBarOpen}>
      {isFetchDone && (
        <TitleInput
          name="article-title"
          placeholder="제목을 입력하세요."
          defaultValue={articleData.title}
          onChange={e => {
            setArticleData(data => {
              data.title = e.target.value;
              return data;
            });
          }}
        />
      )}
      <div
        id="side-editor"
        contentEditable="true"
        placeholder="내용을 입력하세요."
        dangerouslySetInnerHTML={{ __html: articleData.contents }}
      ></div>
    </SideBar>
  );
}

const SideBar = styled.div`
  display: flex;
  position: sticky;
  ${props => (props.sideBar ? "flex: 0 1 40%;" : "flex: 0 1 0%;")}
  top: 67px;
  height: calc(100vh - 67px);
  overflow: hidden scroll;
  overflow-y: scroll;
  flex-direction: column;
  background-color: white;
  transition: all 200ms ease-in 0s;
  box-shadow: 0 6px 10px 0 rgb(0 0 0 / 8%), 0 0 2px 0 rgb(0 0 0 / 15%);

  #side-editor {
    border: none;
    padding: 50px;
    outline: none;
    font-size: 1.3em;
  }

  &:empty:before {
    content: attr(placeholder);
    color: grey;
  }
`;

const TitleInput = styled.input`
  width: 400px;
  margin-top: 60px;
  margin-left: 50px;
  border: 0;
  padding: 0;
  outline: none;
  font-size: 2em;
  color: #6466ff;
`;

export default GenieSideBar;

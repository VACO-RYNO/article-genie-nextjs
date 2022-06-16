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
          placeholder="아티클 제목"
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
        dangerouslySetInnerHTML={{ __html: articleData.contents }}
      ></div>
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

import { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { setCookies } from "cookies-next";
import ReactToPrint from "react-to-print";
import styled from "styled-components";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

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
  const printAreaRef = useRef();
  const editorRef = useRef();
  const titleInputRef = useRef();
  const loginData = useRecoilValue(loginState);
  const isSideBarOpen = useRecoilValue(sideBarState);
  const currentArticleId = useRecoilValue(currentArticleIdState);
  const [articleData, setArticleData] = useState({});
  const [isFetchDone, setIsFetchDone] = useState(false);
  const { showModal } = useModal();
  const originUrl = useRouter().query.url;

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (isSideBarOpen && currentArticleId) {
          const userId = loginData?.data._id;
          const sideEditor = editorRef.current;
          const titleInput = titleInputRef.current;

          setCookies("currentArticleId", currentArticleId);

          if (
            articleData.title === titleInput.value &&
            articleData.contents === sideEditor.innerHTML
          ) {
            return;
          }
          setArticleData(data => {
            data.contents = sideEditor.innerHTML;
            data.title = titleInput.value;

            if (!data.title) {
              data.title = "제목없음";
            }

            return data;
          });

          delete articleData._id;

          const ogImgSrc = document.querySelector(
            `meta[property="og:image"]`,
          ).content;

          await updateArticle(userId, currentArticleId, articleData);
          await updateLastVisitedSite(userId, currentArticleId, {
            originUrl,
            ogImgSrc,
          });
        }
      } catch {
        showModal({
          modalType: "ErrorModal",
          modalProps: {
            message: "작업을 실패했습니다.",
          },
        });
      }
    }, 500);

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
          setArticleData(async data => {
            const sideEditor = editorRef.current;
            const titleInput = titleInputRef.current;

            data.contents = sideEditor.innerHTML;
            data.title = titleInput.value;

            delete data._id;

            const ogImgSrc = document.querySelector(
              `meta[property="og:image"]`,
            ).content;

            if (!data.title) {
              data.title = "제목없음";
            }

            await updateArticle(userId, currentArticleId, data);
            await updateLastVisitedSite(userId, currentArticleId, {
              originUrl,
              ogImgSrc,
            });

            return data;
          });
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
      <ReactToPrint
        trigger={() => <ExportButton />}
        content={() => printAreaRef.current}
      />
      <PrintArea ref={printAreaRef}>
        {isFetchDone && (
          <TitleInput
            ref={titleInputRef}
            name="article-title"
            placeholder="제목을 입력하세요."
            defaultValue={articleData.title}
          />
        )}
        <ViewGap />
        <div
          id="side-editor"
          ref={editorRef}
          contentEditable="true"
          placeholder="내용을 입력하세요."
          dangerouslySetInnerHTML={{ __html: articleData.contents }}
        ></div>
      </PrintArea>
    </SideBar>
  );
}

const SideBar = styled.div`
  display: flex;
  position: sticky;
  flex: ${props => (props.sideBar ? "0 1 40%" : "0 1 0%")};
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
    font-size: 17px;

    &:empty:before {
      content: attr(placeholder);
      color: grey;
    }
  }
`;

const ViewGap = styled.div`
  width: 100%;
  height: 30px;
  background-color: white;
`;

const TitleInput = styled.input`
  width: 400px;
  margin-top: 80px;
  margin-left: 50px;
  border: 0;
  padding: 0;
  outline: none;
  font-size: 27px;
  color: #6466ff;
`;

const PrintArea = styled.div`
  @page {
    size: A4;
    margin: 70px;
  }
`;

const ExportButton = styled(BsFillFileEarmarkPdfFill)`
  position: absolute;
  top: 30px;
  right: 30px;
  width: 30px;
  height: 30px;
  color: #bcbcbc;
  cursor: pointer;
`;

export default GenieSideBar;

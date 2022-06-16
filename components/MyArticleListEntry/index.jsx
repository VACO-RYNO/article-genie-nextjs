import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import PropTypes from "prop-types";

import { deleteArticle } from "../../lib/api";
import { useRecoilValue } from "recoil";
import loginState from "../../lib/recoil/auth";
import useModal from "../../lib/hooks/useModal";
import { useRouter } from "next/router";

function MyArticleListEntry({
  articleId,
  title,
  contents,
  onClick,
  ogImgSrc,
  handleUserArticles,
}) {
  const loginData = useRecoilValue(loginState);
  const { showModal } = useModal();
  const router = useRouter();

  const handleDeleteButtonClick = async () => {
    try {
      await deleteArticle(loginData?.data._id, articleId);

      handleUserArticles(prev =>
        prev.filter(article => article._id !== articleId),
      );
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
    <Wrapper>
      {router.pathname === "/my-article" && (
        <DeleteButton onClick={handleDeleteButtonClick} />
      )}
      <ThumbnailImage
        className="thumbnail-image"
        src={ogImgSrc ? ogImgSrc : "/images/genie-logo.png"}
        alt="thumbnail"
        onClick={onClick}
      />
      <TextWrapper onClick={onClick}>
        <MyArticleEntryTitle>{title}</MyArticleEntryTitle>
        <PreviewWrapper>
          <Preview
            id="my-article-entry"
            dangerouslySetInnerHTML={{
              __html: contents,
            }}
          />
        </PreviewWrapper>
      </TextWrapper>
    </Wrapper>
  );
}

MyArticleListEntry.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  position: relative;
  width: 20rem;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 12%) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  :hover {
    transform: translateY(-5%);
  }
`;

const MyArticleEntryTitle = styled.h4`
  font-size: 1rem;
  margin: 0px 0px 0.25rem;
  line-height: 1.5;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: black;
`;

const ThumbnailImage = styled.img`
  width: auto;
  height: 167px;
  margin-bottom: 10px;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  padding: 1rem;
  width: 90%;
  display: flex;
  flex: 1 1 0%;
  flex-direction: column;
`;

const PreviewWrapper = styled.div`
  flex: 1 1 0%;
`;

const Preview = styled.p`
  margin: 0px 0px 1.5rem;
  word-break: break-word;
  overflow-wrap: break-word;
  font-size: 0.875rem;
  line-height: 1.5;
  height: 80px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DeleteButton = styled(IoMdClose)`
  position: absolute;
  top: 5px;
  right: 10px;
  width: 25px;
  height: 25px;
  color: gray;
  cursor: pointer;
`;

export default MyArticleListEntry;

import styled from "styled-components";
import logo from "../../public/images/genie-logo.png";
import { IoMdClose } from "react-icons/io";

import PropTypes from "prop-types";

function MyArticleListEntry({ title, contents, onClick }) {
  return (
    <Wrapper onClick={onClick}>
      <CloseButton />
      <ThumbnailImage
        className="thumbnail-image"
        src="/images/genie-logo.png"
        alt="thumbnail"
      />
      <MyArticleEntryTitle>{title}</MyArticleEntryTitle>
      <PreviewWrapper
        id="my-article-entry"
        dangerouslySetInnerHTML={{
          __html: contents,
        }}
      />
    </Wrapper>
  );
}

MyArticleListEntry.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 15px;
  height: 200px;
  width: 180px;
  transition: background-color 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;
`;

const MyArticleEntryTitle = styled.div`
  width: 80%;
  height: 2.1rem;
  color: #313134;
  font-size: 0.9rem;
  font-weight: bold;
  box-sizing: border-box;
  padding: 2px;
  overflow: hidden;
  margin-top: 10px;
  font-family: Arial, Helvetica, sans-serif;
`;

const ThumbnailImage = styled.img`
  height: 60%;
  width: 80%;
  margin: 5px;
  margin-bottom: 10px;
`;

const PreviewWrapper = styled.div`
  width: 80%;
  height: 30%;
  color: #313134;
  box-sizing: border-box;
  padding: 5px;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 0.7rem;
  font-family: Arial, Helvetica, sans-serif;
`;

const CloseButton = styled(IoMdClose)`
  position: relative;
  left: 50%;
  width: 25px;
  height: 25px;
  color: #4a4a4f;
  cursor: pointer;
`;

export default MyArticleListEntry;

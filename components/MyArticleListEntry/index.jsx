import styled from "styled-components";
import PropTypes from "prop-types";

function MyArticleListEntry({ title, onClick }) {
  return (
    <Wrapper onClick={onClick}>
      <p>{title}</p>
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
  border: 1px solid pink;
  margin: 15px;
  padding: 0.8rem;

  :hover {
    background-color: #fc7ebe;
  }
`;

export default MyArticleListEntry;

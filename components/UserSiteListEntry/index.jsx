import styled from "styled-components";
import PropTypes from "prop-types";

function UserSiteListEntry({ url }) {
  return (
    <Wrapper>
      <p>{url}</p>
    </Wrapper>
  );
}

UserSiteListEntry.propTypes = {
  url: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

const FaviconImg = styled.img`
  width: 16px;
  height: 16px;
  line-height: 16px;
`;

export default UserSiteListEntry;

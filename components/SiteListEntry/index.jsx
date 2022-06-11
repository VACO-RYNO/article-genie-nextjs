import styled from "styled-components";
import PropTypes from "prop-types";

function SiteListEntry({ name, originUrl, logoUrl }) {
  const handleSubmit = () => {};

  return (
    <EntryWrapper onClick={handleSubmit}>
      {/* <img src={logoUrl} alt="site-logo"></img> */}
      <p>{name}</p>
      <p>{originUrl}</p>
    </EntryWrapper>
  );
}

SiteListEntry.propTypes = {
  name: PropTypes.string.isRequired,
  originUrl: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
};

const EntryWrapper = styled.div`
  margin: 10px;
`;

export default SiteListEntry;

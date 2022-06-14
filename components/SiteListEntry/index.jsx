import { useRouter } from "next/router";

import styled from "styled-components";
import PropTypes from "prop-types";
import Image from "next/image";

function SiteListEntry({ name, originUrl, logoUrl }) {
  const handleSubmit = () => {
    return (window.location.href = `/genie-mode/?url=${originUrl}`);
  };

  return (
    <EntryWrapper onClick={handleSubmit}>
      <SiteLogo src={logoUrl}></SiteLogo>
      <SiteName>{name}</SiteName>
      {/* <p>{originUrl}</p> */}
    </EntryWrapper>
  );
}

SiteListEntry.propTypes = {
  name: PropTypes.string.isRequired,
  originUrl: PropTypes.string.isRequired,
  logoUrl: PropTypes.string.isRequired,
};

const EntryWrapper = styled.div`
  background: #fff;
  color: #666;
  display: block;
  height: 70px;
  overflow: hidden;
  padding: 0 28px;
  transition: background-color 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const SiteLogo = styled.img`
  background-color: #fff;
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: 50px 50px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 25px;
  float: left;
  height: 50px;
  margin: 9px 12px 0 0;
  overflow: hidden;
  width: 50px;
`;

const SiteName = styled.span`
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #444;
  display: block;
  font-weight: 400;
  line-height: 24px;
  padding-top: 22px;
`;

export default SiteListEntry;

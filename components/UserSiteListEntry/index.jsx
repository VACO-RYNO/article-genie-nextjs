import styled from "styled-components";
import PropTypes from "prop-types";

function UserSiteListEntry({ url }) {
  const sourceDomain = url.slice(`https://`.length).split("/").shift();

  return (
    <Wrapper>
      <Span>
        <FaviconImg
          src={`https://${sourceDomain}/favicon.ico`}
          onError={e => (e.target.src = "/images/genie-logo.png")}
        />
      </Span>
      <TitleWrapper>
        <UrlTitle>{url}</UrlTitle>
        <DomainName>
          <span>{sourceDomain}</span>
        </DomainName>
      </TitleWrapper>
    </Wrapper>
  );
}

UserSiteListEntry.propTypes = {
  url: PropTypes.string.isRequired,
};

const Span = styled.span`
  border-radius: 4px;
  float: left;
  height: 18px;
  line-height: 18px;
  margin: 2px 20px 0 0;
  overflow: hidden;
  text-align: center;
  width: 18px;
`;

const DomainName = styled.span`
  color: #999;
  float: right;
  font-size: 14px;
  line-height: 19px;
  margin-left: 14px;
`;

const Wrapper = styled.div`
  position: relative;
  padding: 30px 10px;
`;

const FaviconImg = styled.img`
  position: absolute;
  float: left;
  width: 18px;
  height: 18px;
  line-height: 18px;
`;

const UrlTitle = styled.span`
  color: #121212;
  display: block;
  font-size: 14px;
  line-height: 19px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

const TitleWrapper = styled.div`
  width: 500px;
  display: flex;
  justify-content: space-between;
`;

export default UserSiteListEntry;

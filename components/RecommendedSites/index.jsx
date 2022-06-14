import styled from "styled-components";
import MainPageTitle from "../shared/MainPageTitle";
import SiteList from "../SiteList";

function RecommendedSites() {
  return (
    <Wrapper>
      <MainPageTitle>Recommended Sites</MainPageTitle>
      <SiteListWrapper>
        <SiteList siteTheme={"News"} />
        <SiteList siteTheme={"Tech"} />
        <SiteList />
      </SiteListWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 60px;
`;

const SiteListWrapper = styled.div`
  display: flex;
`;

export default RecommendedSites;

import styled from "styled-components";
import MainPageTitle from "../shared/MainPageTitle";
import SiteList from "../SiteList";

function RecommendedSites() {
  return (
    <Wrapper>
      <MainPageTitle>Recommended Sites</MainPageTitle>
      <SiteList />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 90px;
`;

export default RecommendedSites;

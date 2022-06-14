import styled from "styled-components";
import MainPageTitle from "../shared/MainPageTitle";
import UserSiteList from "../UserSiteList";

function RecentlyViewedSites() {
  return (
    <Wrapper>
      <MainPageTitle>Recently Viewed</MainPageTitle>
      <UserSiteList />
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

export default RecentlyViewedSites;

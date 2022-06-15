import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import UserSiteListEntry from "../UserSiteListEntry";

import { getRecentSites } from "../../lib/api";
import loginState from "../../lib/recoil/auth";

function UserSiteList() {
  const loginData = useRecoilValue(loginState);
  const { data } = useQuery(
    ["fetchRecentSites", loginData.data._id],
    () => getRecentSites(loginData.data._id),
    {
      select: response => response.data,
    },
  );

  const { recentlyVisitedSites } = data;

  return (
    <Wrapper>
      {recentlyVisitedSites.map(url => (
        <LinkDiv
          key={url}
          onClick={() => (window.location.href = `/genie-mode/?url=${url}`)}
        >
          <UserSiteListEntry url={url} />
        </LinkDiv>
      ))}
    </Wrapper>
  );
}

const LinkDiv = styled.div`
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0 6px 10px 0 rgb(0 0 0 / 8%), 0 0 2px 0 rgb(0 0 0 / 15%);
  margin-top: 13px;
  min-width: 800px;
  min-height: 308px;
  padding: 25px 0 30px;
`;

export default UserSiteList;

import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import UserSiteListEntry from "../UserSiteListEntry";

import { getRecentSites } from "../../lib/api";
import loginState from "../../lib/recoil/auth";
import Link from "next/link";

function UserSiteList() {
  const loginData = useRecoilValue(loginState);
  const { data } = useQuery(
    ["fetchRecentSites", loginData?.data._id],
    () => getRecentSites(loginData?.data._id),
    { select: response => response.data },
  );
  const { recentlyVisitedSites } = data;

  return (
    <Wrapper>
      {recentlyVisitedSites.map(url => (
        <Link href={`genie-mode/?url=${url}`}>
          <a>
            <UserSiteListEntry url={url} />
          </a>
        </Link>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export default UserSiteList;

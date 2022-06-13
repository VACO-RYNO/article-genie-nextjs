import { useRecoilValue } from "recoil";

import styled from "styled-components";

import sideBarState from "../../lib/recoil/sideBar";

function GenieSideBar() {
  const isSideBarOpen = useRecoilValue(sideBarState);

  return (
    <SideBar sideBar={isSideBarOpen}>
      <textarea className="side-textarea"></textarea>
    </SideBar>
  );
}

const SideBar = styled.div`
  transition: all 200ms ease-in 0s;
  position: sticky;
  ${props => (props.sideBar ? "flex: 0 0 40%;" : "flex: 0 0 0px;")}
  top: 67px;
  height: calc(100vh - 67px);
  overflow: hidden scroll;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.05);

  .side-textarea {
    height: 100%;
    border: none;
    padding: 2rem;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export default GenieSideBar;

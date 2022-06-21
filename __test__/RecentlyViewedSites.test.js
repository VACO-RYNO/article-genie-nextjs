import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import loginState from "../lib/recoil/auth";
import MainPage from "../pages";

describe("RecentlyViewedSites", () => {
  const useQuery = jest.spyOn(require("react-query"), "useQuery");

  useQuery.mockImplementation(() => ({
    data: {
      recentlyVisitedSites: ["pageList"],
    },
  }));

  it("if it's not logged in, recently viewed sites is not rendered", async () => {
    const { container } = render(
      <RecoilRoot>
        <MainPage />
      </RecoilRoot>,
    );

    expect(container).not.toHaveTextContent("Recently Viewed");
  });

  it("if it's logged in, recently viewed sites is rendered", async () => {
    const { container } = render(
      <RecoilRoot
        initializeState={snap =>
          snap.set(loginState, {
            data: {
              _id: "testId",
              name: "testMan",
              email: "test@example.com",
              profileImageUrl: "testImageUrl",
            },
          })
        }
      >
        <MainPage />
      </RecoilRoot>,
    );

    expect(container).toHaveTextContent("Recently Viewed");
  });
});

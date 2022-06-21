import { render } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import MainPage from "../pages";

describe("Home", () => {
  it("renders a heading", () => {
    const { container } = render(
      <RecoilRoot>
        <MainPage />
      </RecoilRoot>,
    );

    expect(container).toHaveTextContent("Recommended Sites");
  });
});

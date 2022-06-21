import { render, screen, cleanup } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import AppHeader from "../components/AppHeader";

describe("AppHeader", () => {
  afterEach(cleanup);
  function renderAppHeader() {
    return render(
      <RecoilRoot>
        <AppHeader />
      </RecoilRoot>,
    );
  }

  it("Logo and buttons shall be rendered on the main page.", () => {
    const useRouter = jest.spyOn(require("next/router"), "useRouter");

    useRouter.mockImplementation(() => ({
      route: "/",
      pathname: "/",
    }));

    const { container } = renderAppHeader();

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("login button on the main page.", () => {
    const useRouter = jest.spyOn(require("next/router"), "useRouter");

    useRouter.mockImplementation(() => ({
      route: "/",
      pathname: "/",
    }));

    const { container } = renderAppHeader();

    expect(container).toHaveTextContent("Login");
    expect(container).not.toHaveTextContent("Enter a URL of the website.");
  });

  it("The Genie Mode page renders an address entry window", () => {
    const useRouter = jest.spyOn(require("next/router"), "useRouter");

    useRouter.mockImplementation(() => ({
      route: "/genie-mode",
      pathname: "/genie-mode",
    }));

    const { container } = renderAppHeader();
    const addressInput = screen.getByPlaceholderText(
      "Enter a URL of the website.",
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(addressInput).toBeTruthy();
  });
});

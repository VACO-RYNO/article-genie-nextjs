import { getServerSideProps } from "../pages/genie-mode";

describe("getServerSideProps", () => {
  it("Props should be null when url is invalid", async () => {
    const context = {
      query: {
        url: "",
      },
    };

    const response = await getServerSideProps(context);

    expect(response).toEqual({
      props: {
        headString: null,
        bodyString: null,
      },
    });
  });
});

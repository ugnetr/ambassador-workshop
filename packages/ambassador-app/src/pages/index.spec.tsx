import React from "react";
import { render } from "@testing-library/react";
import { PageHeaderTestkit } from "wix-style-react/dist/testkit";
import { testkit } from "@wix/yoshi-flow-bm/testkit";
import { whenRequest } from "@wix/yoshi-flow-bm/testkit/http-client";
import Index from "./index";
import { commentsAPI } from "../api/comments.api";

const mockComments = [
  {
    author: "Mark",
    text: "Mock comment",
  },
  {
    author: "Dan",
    text: "Mock comment 2",
  },
];

describe("index", () => {
  testkit.beforeAndAfter();

  beforeEach(() => testkit.reset());

  it.skip("renders a title correctly", async () => {
    const { TestComponent } = testkit.getBMComponent(Index);
    const { baseElement, findByTestId } = render(<TestComponent />);

    await findByTestId("app-title");

    const pageHeaderTestkit = PageHeaderTestkit({
      wrapper: baseElement,
      dataHook: "app-title",
    });

    expect(await pageHeaderTestkit.exists()).toBe(true);
  });

  it("renders initial products", async () => {
    const { TestComponent } = testkit.getBMComponent(Index, {
      mocks: [
        whenRequest(commentsAPI)
          .withData("")
          .reply(200, () => mockComments),
      ],
    });

    const { findAllByTestId } = render(<TestComponent />);

    const comments = await findAllByTestId("comment");

    expect(comments.length).toBe(2);
  });
});

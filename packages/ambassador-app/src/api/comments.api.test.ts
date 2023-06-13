import { bootstrap } from "@wix/yoshi-flow-bm/test/serverless";
import { NodeWorkshopScalaApp } from "@wix/ambassador-node-workshop-scala-app/rpc";
import { aComment } from "@wix/ambassador-node-workshop-scala-app/builders";
import { fetch } from "./comments.api";

const { httpClient, serverlessApp } = bootstrap();

describe("Comments API", () => {
  serverlessApp.beforeAndAfter();

  test("should fetch comments", async () => {
    const commentsStub =
      serverlessApp.ambassador.createStub(NodeWorkshopScalaApp);
    const mockComment = aComment().build();
    commentsStub.CommentsService().fetch.when("1234").resolve([mockComment]);

    const { data: comments } = await httpClient.request(fetch("1234"));

    expect(comments).toEqual([mockComment]);
  });
});

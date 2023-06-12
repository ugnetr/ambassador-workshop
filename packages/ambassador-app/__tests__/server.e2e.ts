import { bootstrap } from "@wix/yoshi-flow-bm/test/serverless";
import HttpClient from "yoshi-serverless-client";
import { NodeWorkshopScalaApp } from "@wix/ambassador-node-workshop-scala-app/rpc";
import { aComment } from "@wix/ambassador-node-workshop-scala-app/builders";

const { serverlessApp } = bootstrap();
serverlessApp.beforeAndAfter();

let client: HttpClient;

beforeAll(async () => {
  client = new HttpClient({ baseUrl: serverlessApp.getUrl() });
});

test("should fetch and return comments", async () => {
  const commentsStub =
    serverlessApp.ambassador.createStub(NodeWorkshopScalaApp);
  const mockComment = aComment().build();
  commentsStub.CommentsService().fetch.when("1234").resolve([mockComment]);

  const response = await client.request(fetch)();

  console.log("AAAA: ", response);

  expect(response).toEqual([mockComment]);
});

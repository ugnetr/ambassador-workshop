import HttpClient from "yoshi-serverless-client";
import { bootstrap } from "yoshi-serverless-testing/build/index";
import { NodeWorkshopScalaApp } from "@wix/ambassador-node-workshop-scala-app/rpc";
import { aComment } from "@wix/ambassador-node-workshop-scala-app/builders";
import { commentsAPI } from "./comments.api"; // import your server function

const serverlessApp = bootstrap();
serverlessApp.beforeAndAfter();
let client: HttpClient;
beforeAll(async () => {
  client = new HttpClient({ baseUrl: serverlessApp.getUrl() });
});
test("should fetch comments", async () => {
  const commentsStub =
    serverlessApp.ambassador.createStub(NodeWorkshopScalaApp);
  const mockComment = aComment().build();
  commentsStub.CommentsService().fetch.when("1234").resolve([mockComment]);
  const response = await client.request(fetch)();
  expect(response).toEqual([mockComment]);
});

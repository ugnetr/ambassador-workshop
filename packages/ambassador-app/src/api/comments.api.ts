import { method } from "@wix/yoshi-flow-bm/serverless";
import { NodeWorkshopScalaApp } from "@wix/ambassador-node-workshop-scala-app/rpc";

export const commentsAPI = method(async function () {
  const commentsService = NodeWorkshopScalaApp().CommentsService();

  return commentsService(this.context.aspects).fetch(
    "5a5a7bc9-098d-4f78-88bc-4ca73d24e88b"
  );
});

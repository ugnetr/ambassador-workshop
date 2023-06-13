import { method } from "@wix/yoshi-flow-bm/serverless";
import {
  Comment,
  NodeWorkshopScalaApp,
} from "@wix/ambassador-node-workshop-scala-app/rpc";

export const fetch = method(async function (metaSiteId: string) {
  const commentsService = NodeWorkshopScalaApp().CommentsService();

  return commentsService(this.context.aspects).fetch(metaSiteId);
});

export const add = method(async function (
  metaSiteId: string,
  comment: Comment
) {
  const commentsService = NodeWorkshopScalaApp().CommentsService();

  return commentsService(this.context.aspects).add(metaSiteId, comment);
});

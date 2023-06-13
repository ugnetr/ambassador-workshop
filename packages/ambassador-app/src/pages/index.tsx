import React, { FC } from "react";
import {
  useAppLoaded,
  useModuleParams,
  useRequest,
  useTranslation,
} from "@wix/yoshi-flow-bm";
import { Page, Box, Text } from "wix-style-react";
import { fetch } from "../api/comments.api";

const Index: FC = () => {
  useAppLoaded({ auto: true });

  const { t } = useTranslation();
  const { metaSiteId } = useModuleParams();
  const { loading, data, error } = useRequest(fetch(metaSiteId));

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Page>
      <Page.Header dataHook="app-title" title={t("app.title")} />
      <Page.Content>
        {data?.map((comment, index) => (
          <Box key={index} dataHook="comment">
            <Text dataHook="comment-text">{`${comment.text} - ${comment.author}`}</Text>
          </Box>
        ))}
      </Page.Content>
    </Page>
  );
};

export default Index;

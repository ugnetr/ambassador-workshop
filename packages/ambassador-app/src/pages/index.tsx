import React, { FC } from "react";
import { useAppLoaded, useRequest, useTranslation } from "@wix/yoshi-flow-bm";
import { Page, Box } from "wix-style-react";
import { commentsAPI } from "../api/comments.api";

const Index: FC = () => {
  useAppLoaded({ auto: true });

  const { t } = useTranslation();
  const { loading, data, error } = useRequest(commentsAPI());

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Page>
      <Page.Header dataHook="app-title" title={t('app.title')} />
      <Page.Content>
        {data.map((comment, index) => (
          <Box key={index}>{`${comment.text} - ${comment.author}`}</Box>
        ))}
      </Page.Content>
    </Page>
  );
};

export default Index;

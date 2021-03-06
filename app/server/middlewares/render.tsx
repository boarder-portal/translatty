import { FC } from 'react';
import path from 'path';
import { Request, Response } from 'express';
import { ChunkExtractor } from '@loadable/server';
import { StaticRouter } from 'react-router-dom/server';
import { renderToString } from 'react-dom/server';
import { RecoilRoot } from 'recoil';

import getPageData, {
  IPageData,
} from 'server/middlewares/utilities/getPageData';
import pageDataToRecoilState from 'common/utilities/pageDataToRecoilState';

import App from 'client/components/App/App';

const statsFile = path.resolve('./build/client/loadable-stats.json');
const extractor = new ChunkExtractor({ statsFile, publicPath: '/build' });

interface IServerAppProps {
  url: string;
  pageData: IPageData;
}

const ServerApp: FC<IServerAppProps> = (props) => {
  const { url, pageData } = props;

  return (
    <StaticRouter location={url}>
      <RecoilRoot initializeState={pageDataToRecoilState(pageData)}>
        <App />
      </RecoilRoot>
    </StaticRouter>
  );
};

export default async function render(req: Request, res: Response) {
  const pageData = await getPageData(req);

  const jsx = extractor.collectChunks(
    <ServerApp url={req.url} pageData={pageData} />,
  );
  const appHtml = renderToString(jsx);

  const linkTags = extractor.getLinkTags();
  const styleTags = extractor.getStyleTags();
  const scriptTags = extractor.getScriptTags();

  return res.send(`
<html>
    <head>
        <title>Engly</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, maximum-scale=1, user-scalable=0">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="theme-color" content="#ffffff">
        <link rel="apple-touch-icon" sizes="180x180" href="/public/apple-touch-icon.png?v=2">
        <link rel="icon" type="image/x-icon" href="/public/favicon.ico?v=2">
        <link rel="manifest" href="/public/manifest.json?v=2" />
        ${linkTags}
        ${styleTags}
        <script>window.initialRecoilState='${JSON.stringify(pageData)}'</script>
    </head>

    <body>
        <div id="root">${appHtml}</div>

        ${scriptTags}
    </body>
</html>
    `);
}

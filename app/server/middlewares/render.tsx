import { FC } from 'react';
import path from 'path';
import { Request, Response } from 'express';
import { ChunkExtractor } from '@loadable/server';
import { StaticRouter } from 'react-router-dom/server';
import { renderToString } from 'react-dom/server';
import { RecoilRoot } from 'recoil';

import { IRecoilState } from 'common/types';

import {
  IDataPreloader,
  PreloadDataListContext,
} from 'server/utilities/preloadDataListContext';
import recoilStateToAtoms from 'common/utilities/recoilStateToAtoms';

import App from 'client/components/App/App';

const statsFile = path.resolve('./build/client/loadable-stats.json');
const extractor = new ChunkExtractor({ statsFile, publicPath: '/build' });

interface IServerAppProps {
  url: string;
  preloadDataList?: IDataPreloader[];
  recoilState: IRecoilState;
}

const ServerApp: FC<IServerAppProps> = (props) => {
  const { url, preloadDataList, recoilState } = props;

  return (
    <PreloadDataListContext.Provider value={preloadDataList || null}>
      <RecoilRoot initializeState={recoilStateToAtoms(recoilState)}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </RecoilRoot>
    </PreloadDataListContext.Provider>
  );
};

export default async function render(req: Request, res: Response) {
  const preloadDataList: IDataPreloader[] = [];
  const recoilState: IRecoilState = {
    posts: [],
  };

  const initJsx = extractor.collectChunks(
    <ServerApp
      url={req.url}
      preloadDataList={preloadDataList}
      recoilState={recoilState}
    />,
  );

  renderToString(initJsx);

  await Promise.all(
    preloadDataList.map((preloadData) => preloadData(recoilState)),
  );

  console.log('recoilState before final render', recoilState);

  const jsx = extractor.collectChunks(
    <ServerApp url={req.url} recoilState={recoilState} />,
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
        <script>window.initialRecoilState='${JSON.stringify(
          recoilState,
        )}'</script>
    </head>

    <body>
        <div id="root">${appHtml}</div>

        ${scriptTags}
    </body>
</html>
    `);
}

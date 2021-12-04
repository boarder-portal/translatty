import { ISub, ISubPath } from 'server/types/subs';

import getParsedLanguageSubs from 'server/utilities/subs/getParsedLanguageSubs';

export default async function getParsedSubs(params: ISubPath): Promise<{
  en: ISub[];
  ru: ISub[];
}> {
  return {
    en: await getParsedLanguageSubs({ ...params, language: 'en' }),
    ru: await getParsedLanguageSubs({ ...params, language: 'ru' }),
  };
}

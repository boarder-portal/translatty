import { ISub } from 'server/types/subs';

import getParsedLanguageSubs from 'server/utilities/subs/getParsedLanguageSubs';

export default async function getParsedSubs(params: {
  name: string;
  season: number;
  episode: number;
}): Promise<{
  en: ISub[];
  ru: ISub[];
}> {
  return {
    en: await getParsedLanguageSubs({ ...params, language: 'en' }),
    ru: await getParsedLanguageSubs({ ...params, language: 'ru' }),
  };
}

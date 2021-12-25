import { MutableSnapshot } from 'recoil';
import { userAtom } from 'common/atoms/userAtom';

import { IPageData } from 'server/middlewares/utilities/getPageData';

export default function pageDataToRecoilState(
  pageData: IPageData,
): (mutableSnapshot: MutableSnapshot) => void {
  const { user } = pageData;

  return ({ set }: MutableSnapshot): void => {
    if (user) {
      set(userAtom, user);
    }
  };
}

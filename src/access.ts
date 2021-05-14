import type { User } from './models/user';
import { UserStatusType } from './models/user';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: User | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.status === UserStatusType.Super,
  };
}

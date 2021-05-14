import { HttpUtils } from '@/http/request/index';
import type { User } from '@/models/user';
import { encrypt } from '@/utils/encrypt';

export interface LoginParams {
  username: string;
  password: string;
}

const login = (params: LoginParams) => {
  return HttpUtils.postJson<{
    accessToken: string;
  }>('/auth/login', {
    username: params.username,
    password: encrypt(params.password),
  });
};

const logout = () => {
  return HttpUtils.postJson<void>('/auth/logout');
};

const profile = () => {
  return HttpUtils.getJson<User>('/auth/profile');
};

export const AuthServices = {
  login,
  logout,
  profile,
};

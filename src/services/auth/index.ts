import { HttpUtils } from '@/http/request/index';
import type { User } from '@/models/user';

export interface LoginParams {
  username: string;
  password: string;
}

const login = (params: { username: string; password: string }) => {
  return HttpUtils.postJson<void>('/auth/login', params);
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

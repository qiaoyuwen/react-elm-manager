export enum UserStatusType {
  Normal = 1,
  Super = 2,
}

export interface User {
  id: number;
  password: string;
  username: string;
  createTime: string;
  status: UserStatusType;
  avatar: string;
}

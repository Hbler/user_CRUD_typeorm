export interface IUserRequest {
  name: string;
  email: string;
  password?: string;
  age: number;
}

export interface IUserResponse extends IUserRequest {
  id: string;
  created_at: Date;
  updated_at: Date;
}

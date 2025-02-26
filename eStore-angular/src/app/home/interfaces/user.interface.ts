export interface User {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  pin: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface LoginToken {
  token: string;
  expiresInSeconds: number;
}

export interface UserProfileInterface {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  extra: string;
}

export interface AuthStateInterface {
  me: UserProfileInterface | null;
  token: string;
  isAuthenticated: boolean;
}

function state(): AuthStateInterface {
  return {
    me: null,
    token: '',
    isAuthenticated: false,
  };
}

export default state;

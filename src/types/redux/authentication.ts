export type AuthenticationState = {
  loading: boolean;
  isAuthenticated: boolean;
  errorMessage: string | null;
  forgotEmailSent: boolean;
};

export type RegisterRequestType = {
  email: string;
  password: string;
  fullName: string;
  nationality?: string;
  phonenumber?: string;
};

export type LoginRequestType = {
  email?: string;
  password?: string;
  socialNetwork?: string;
  socialToken?: string;
  applicationType?: string;
  fullName?: string;
};

export type LoginResponseType = {
  accessToken: string;
  tokenType: string;
};

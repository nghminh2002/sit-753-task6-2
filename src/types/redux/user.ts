export type UserState = {
  loading: boolean;
  user: UserType | null;
  errorMessage: string | null;
};

export type UserType = {
  authorities: string[];
  avatar: string | null;
  createdDate: string;
  email: string;
  fullName: string;
  id: string;
  nationality: string | null;
  updatedDate: string;
};

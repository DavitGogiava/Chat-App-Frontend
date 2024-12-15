import { fetchClient, SuccessResponse, Status } from "@/lib/fetchClient";

interface UserAuthData {
  username: string;
  email?: string;
  password: string;
}

export interface UserAuthResponse {
  access_token: string;
}

export interface UserRegisterSuccess extends SuccessResponse {
  message?: string;
  data?: UserAuthResponse;
  status: Status.SUCCESS;
}

export interface UserLoginSuccess {
  message?: string;
  data?: UserAuthResponse;
  status: Status.SUCCESS;
}

export const login = async ({ username, password }: UserAuthData) => {
  const response = await fetchClient().then(({ post }) =>
    post<UserLoginSuccess>("/auth/login", {
      username,
      password,
    })
  );
  return response;
};

export const register = async ({ username, email, password }: UserAuthData) => {
  const response = await fetchClient().then(({ post }) =>
    post<UserRegisterSuccess>("/auth/register", {
      username,
      email,
      password,
    })
  );

  return response;
};

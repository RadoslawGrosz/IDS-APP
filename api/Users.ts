import { UserCredentials, UserDto } from "../types";
import { client } from "./index";
import { Transaction } from "./Storekeeper";

interface NewPasswordRequest {
  email: string;
  sessionId: string | null;
  newPassword: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  role: string;
  organizationId?: string | null;
  phoneNumber?: string | null;
}
export interface EditUserRequest {
  userId: string;
  name: string;
  email: string;
  role: string;
  organizationId?: string | null;
  phoneNumber?: String | null;
}
export interface DeleteUserRequest {
  userId: string;
}

export interface CrateUserResponse {}

export interface ResetPasswordRequest {
  email: string;
  confirmationCode: string;
  newPassword: string;
}

export const createUser = (request: CreateUserRequest) =>
  client.post("users", request);

export const fetchUsers = async () =>
  (await client.get<UserDto[]>("users")).data;

export const loginRequest = async (userCredentails: UserCredentials) => {
  return client.post("users/login", userCredentails);
};

export const getLoggedUser = async () => {
  return client.get("users/me");
};

export const setNewPassword = (newPasswordData: NewPasswordRequest) =>
  client.post("users/newPassword", newPasswordData);

export const forgotPassword = (email: string) =>
  client.post("users/forgotPassword", {
    email,
  });

export const resetPassword = (request: ResetPasswordRequest) =>
  client.post("users/resetPassword", request);

export const fetchStorekeepers = async () =>
  (await client.get<UserDto[]>("users/storekeepers")).data;

export const deleteUser = async (request: DeleteUserRequest) =>
  client.delete(`users/${request.userId}`);

export const editUser = async (request: EditUserRequest) =>
  client.put(`users/${request.userId}`, request);

export const replenish = async (
  organizationId: string,
  distributionPointId: string,
  data: Transaction[]
) => {
  console.log(client);

  client.post(
    `organizations/${organizationId}/distributionPoints/${distributionPointId}/replenishments`,
    data
  );
};

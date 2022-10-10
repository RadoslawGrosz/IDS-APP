import { client } from '.';
import { OrganizationUser, Token, UserDto } from '../types';
import { FetchOrganizationFlowsResponse } from './OrganizationFlows';
import { FetchTokenFilters } from './Tokens';

export interface CreateOrganizationUserRequest {
  name: string;
  email: string;
  role: string;
  employeeNumber?: string | null;
  phoneNumber?: string | null;
}
export interface EditOrganizationUserRequest {
  userId: string;
  name: string;
  email: string;
  role: string;
  organizationId: string;
  employeeNumber?: string | null;
  phoneNumber?: string | null;
}
export interface DeleteOrganizationUserRequest {
  userId: string;
  organizationId: string;
}

export type CreateOrganizationUserResponse = string;

export const createOrganizationUser = async (organizationId: string, request: CreateOrganizationUserRequest) =>
  (await client.post<CreateOrganizationUserResponse>(`/organizations/${organizationId}/users`, request)).data;

export const fetchOrganizationUsers = async (organizationId: string) =>
  (await client.get<OrganizationUser[]>(`/organizations/${organizationId}/users`)).data;

export const deleteOrganizationUser = async (request: DeleteOrganizationUserRequest) =>
  client.delete(`/organizations/${request.organizationId}/users/${request.userId}`);

export const editOrganizationUser = async (request: EditOrganizationUserRequest) =>
  client.put(`/organizations/${request.organizationId}/users/${request.userId}`, request);

export const getOrganizationUser = async (organizationId: string, userId: string) =>
  (await client.get<UserDto | null>(`/organizations/${organizationId}/users/${userId}`)).data;

export const getUserTokenSummaries = async (organizationId: string, userId: string) =>
  (await client.get<Token[]>(`/organizations/${organizationId}/users/${userId}/myTokenSummaries`)).data;

export const getUserTransactions = async (organizationId: string, userId: string) =>
  (await client.get<FetchOrganizationFlowsResponse>(`/organizations/${organizationId}/users/${userId}/myTransactions`)).data;

export const getUserTokens = async (organizationId: string, userId: string, params: FetchTokenFilters) =>
  (await client.get<Token[]>(`/organizations/${organizationId}/users/${userId}/myTokens`, { params })).data;

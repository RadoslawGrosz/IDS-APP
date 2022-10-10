import { Capabilities, CapabilitiesFilters, LimitationProfile, LimitedToken, Token } from '../types';

import { client } from './index';

export interface FetchTokenFilters {
  searchTerm: string | null;
  LastUsedAtFrom?: Date | null;
  LastUsedAtTo?: Date | null;
  CreatedAtFrom?: Date | null;
  CreatedAtTo?: Date | null;
  isUnlimited?: boolean;
  isAnonymous?: boolean;
  limitationProfileId?: string;
  tokenType: 'physical' | 'virtual' | 'all';
}

export interface CreateTokenRequest {
  organizationId: string;
  ownerId?: string;
  limitationProfileId?: string;
  employeeNumber?: string | null;
  cardReadingNumber?: string | null;
  physical: boolean;
}

export interface CreateTokenResponse {
  id: string;
}

export interface AssignOwnerToTokenRequest {
  ownerId: string;
}

export interface UpdateTokenRequest {
  limitationProfileId?: string | null;
  employeeNumber?: string | null;
  cardReadingNumber?: string | null;
}

interface GroupLimitationsRequest {
  groupId: string;
}

export interface AssociatedTokensFilters {
  searchTerm: string;
}

export interface CreateLimitRequest {
  name: string;
  groupLimitations: GroupLimitationsRequest[];
}

export interface CreateLimitResponse {
  id: string;
  name: string;
  groupLimitations: any[];
  associatedTokens: any[];
}

export const fetchTokens = async (organizationId: string, params: FetchTokenFilters) => {
  const response = await client.get<Token[]>(`organizations/${organizationId}/tokens`, { params });

  return response.data;
};

export const fetchToken = async (organizationId: string, tokenId: string) =>
  (await client.get<Token>(`organizations/${organizationId}/tokens/${tokenId}`)).data;

export const createToken = async (request: CreateTokenRequest) => {
  const { organizationId, ...formData } = request;
  const response = await client.post<CreateTokenResponse>(`organizations/${organizationId}/tokens`, request);

  return response;
};

export const deleteToken = async (organizationId: string, tokenId: string) =>
  (await client.delete(`organizations/${organizationId}/tokens/${tokenId}`)).data;

export const getTokenCapabilities = async (organizationId: string, tokenId: string, params: CapabilitiesFilters) =>
  (await client.get<Capabilities[]>(`organizations/${organizationId}/tokens/${tokenId}/capabilities`, { params })).data;

export const assignOwnerToToken = async (organizationId: string, tokenId: string, requestData: AssignOwnerToTokenRequest) =>
  (await client.put(`organizations/${organizationId}/tokens/${tokenId}`, requestData)).data;

export const updateToken = async (organizationId: string, tokenId: string, requestData: UpdateTokenRequest) =>
  (await client.put(`organizations/${organizationId}/tokens/${tokenId}/update`, null, { params: requestData })).data;

export const createLimitationProfile = async (organizationId: string, request: CreateLimitRequest) => {
  const response = await client.post<CreateLimitResponse>(`organizations/${organizationId}/limitationProfiles`, request);

  return response;
};

export const editLimitationProfile = async (organizationId: string, limitationProfileId: string, request: CreateLimitRequest) => {
  const response = await client.put<CreateLimitRequest>(
    `organizations/${organizationId}/limitationProfiles/${limitationProfileId}`,
    request
  );

  return response;
};

export const deleteLimitationProfile = async (organizationId: string, id: string) => {
  const response = await client.delete(`organizations/${organizationId}/limitationProfiles/${id}`);

  return response;
};

export const fetchLimitationProfiles = async (organizationId: string) =>
  (await client.get<LimitationProfile[]>(`organizations/${organizationId}/limitationProfiles`)).data;

export const fetchLimitationProfile = async (organizationId: string, limitationProfileId: string) =>
  (await client.get<LimitationProfile>(`organizations/${organizationId}/limitationProfiles/${limitationProfileId}`)).data;

export const fetchLimitationProfileTokens = async (organizationId: string, limitationProfileId: string, params: AssociatedTokensFilters) =>
  (await client.get<LimitedToken[]>(`organizations/${organizationId}/limitationProfiles/${limitationProfileId}/tokens`, { params })).data;

export const associateTokenWithLimitationProfile = async (organizationId: string, limitationProfileId: string, tokens: string[]) =>
  (await client.post(`organizations/${organizationId}/limitationProfiles/${limitationProfileId}/tokens`, tokens)).data;

export const dissociateTokenWithLimitationProfile = async (organizationId: string, limitationProfileId: string, tokens: string[]) =>
  (await client.delete(`organizations/${organizationId}/limitationProfiles/${limitationProfileId}/tokens`, { data: tokens })).data;

/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Login: undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export interface ProductOnDistributionPoint extends BasicProductData {
  id: string;
  number: string;
  name: string;
  amount: number;
  thresholdValue: number;
  upperLimit: number;
  isCriticalCase: boolean;
  isDefined: boolean;
  isDepleting: boolean;
  loadPercentage: number;
}

export interface ProductToAssignToDistributionPoint {
  productId: string;
  name: string;
  number: string;
  upperLimit: number;
  thresholdValue: number;
}

export interface StocksOnDistributionPoint extends BasicProductData {
  amount: number;
}

export interface DistributionPoint {
  id: string;
  organizationId: string;
  name: string;
  loadPercentage: number;
  criticalCases: number;
  unassignedLimits: number;
  exceededUpperLimits: number;
  assignedStorekeepersCount: number;
  products: ProductOnDistributionPoint[];
}
export interface SubscriptionPlan {
  administrators: string;
  flowsStoragePeriodInMonths: string;

  organizationAdministrators: string;
  organizationDistributionPoints: string;
  organizationLimitationProfiles: string;
  organizationStorekeepers: string;
  organizationTokens: string;
  organizationUsers: string;
  organizations: string;
  productGroups: string;
  products: string;
  storekeepers: string;
  type: string;
}

export interface DistributionPointStoreKeeper {
  id: string;
  email: string;
  name: string;
}

export interface StockFilters {
  searchTerm: string | null;
}

export interface DistributionPointsFilters {
  searchTerm: string;
}

export interface OrganizationProductGroup {
  id: string;
  operatorId: string;
  organizationId: string;
  name: string;
  referencedId: string;
  parentId: string;
}

export interface OrganizationProduct {
  id: string;
  operatorId: string;
  organizationId: string;
  number: string;
  name: string;
  productGroupId: string;
  referencedProductId: string;
  referencedProductGroupId: string;
}

export enum OrganizationQuotaType {
  MaxUsers,
  MaxAdministrators,
  MaxStorekeepers,
  MaxLimitationProfiles,
  MaxTokens,
  MaxDistributionPoints,
}

export enum DistributionPointsQueryKey {
  DistributionPoints = "distributionPoints",
  DistributionPointDetails = "distributionPointDetails",
  ProductsOnDistributionPoint = "productsOnDistributionPoint",
  Stocks = "stocks",
  StoreKeepers = "distributionPoint.storeKeepers",
  ProductWithCapabilities = "productWithCapabilities",
}

export enum OrganizationsQueryKey {
  Organizations = "organizations",
  OrganizationUsers = "organizationUsers",
  Organization = "organization",
  StorekeeperOrganization = "storekeeperOrganization",
}

export enum OrganizationUserQueryKey {
  OrganizationUsers = "organizations/{organizationId}/users",
}

export enum OperatorUserQueryKey {
  OperatorUsers = "operatorUsers",
}

export enum StorekeepersQueryKey {
  Storekeepers = "storekeepers",
}

export enum ProductsGroupQueryKey {
  ProductsGroups = "productsGroups",
}

export enum ProductQueryKey {
  products = "products",
}

export enum ReportsQueryKey {
  Reports = "reports",
  ReportFile = "reportFile",
}

export enum TokensQueryKey {
  Tokens = "tokens",
  TokenDetails = "tokenDetails",
  Capabilities = "capabilities",
  LimitationProfile = "limitationProfile",
  LimitationProfiles = "limitationProfiles",
  LimitationProfileTokens = "LimitationProfileTokens",
  Associated = "associated",
  Summaries = "summaries",
  Consumer = "consumer",
}

export enum SubscriptionPlanQueryKey {
  myPlan = "myPlan",
  OrganizationsVerification = "organizationsVerification",
  ProductsVerification = "productsVerification",
  UsersVerification = "usersVerification",
}

export enum TagsQueryKey {
  Tags = "tags",
}

export enum LimitationValues {
  Na = "n/a",
  PerDay = "per day",
  PerWeek = "per week",
  PerMonth = "per month",
  Unlimited = "Unlimited",
}

export const OrganizationProductGroupQueryKey = {
  OrganizationProductGroups: "organizationProductGroups",
};

export const OrganizationProductQueryKey = {
  OrganizationProducts: "organizationProducts",
};

export interface Flow {
  id: string;
  operatorId: string;
  operatorName: string;
  organizationId: string;
  organizationName: string;
  distributionPointId: string;
  distributionPointName: string;
  distributionPointTimestamp: string;
  productName: string;
  productNumber: string;
  amount: number;
  userName: string;
  userId: string;
  tokenId: string;
  tags: string[] | null;
}

export interface FlowFiltersValue {
  limit: number;
  productNumber?: string;
  tokenId?: string;
  distributionPointTimestampStart?: string | null;
  distributionPointTimestampEnd?: string | null;
  distributionPointId?: string;
  organizationId?: string;
  operationType?: string;
  userId?: string;
}

export interface GroupLimitation {
  groupId: string;
  groupName: string;
  parentGroupId: string | null;
  collectively: boolean;
  limitationSchema: string;
}

export interface LimitationProfile {
  id: string;
  name: string;
  groupLimitations: GroupLimitation[];
  associatedTokens: TokenAssociatedWithLimitation[];
}

export interface Organization {
  id: string;
  name: string;
  contactEmail: string | null;
  contactPerson: string | null;
  timezone: string;
  address: string;
  quota: {
    maxAdministrators: number;
    maxDistributionPoints: number;
    maxLimitationProfiles: number;
    maxStorekeepers: number;
    maxTokens: number;
    maxUsers: number;
  };
  statistics: {
    totalAdministrators: number;
    totalDistributionPoints: number;
    totalLimitationProfiles: number;
    totalStorekeepers: number;
    totalTokens: number;
    totalUsers: number;
  };
}

export interface OrganizationUser {
  id: string;
  name: string;
  email: string;
  roleName: string;
  employeeNumber: string | null;
  phoneNumber: string | null;
}

export interface BasicProductData {
  number: string;
  name: string;
}

export interface Product {
  id: string;
  number: string;
  description: string;
  productGroupId: string;
  productGroup: ProductGroup;
  imageId?: string | null;
  imageUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductGroup {
  id: string;
  name: string;
  parentGroupId: string | null;
}

export interface ProductFilters {
  searchTerm: string;
}

export interface ProductWithCapabilities {
  name: string;
  number: string;
  amount: number;
  capabilitiesAmount: number;
  unlimited: true;
  productGroupId: string;
  collectively: boolean;
}

export interface ReportsFilters {
  dateFrom: Date | null;
  dateTo: Date | null;
  organizationId: string;
}

export type ReportsOrganizationFilters = Omit<ReportsFilters, "organizationId">;

export interface ReportProduct extends BasicProductData {
  organizationName: string;
  amount: number;
}

export interface Token {
  id: string;
  organizationId: string | null;
  owner: string | null;
  ownerId: string | null;
  issuer: string | null;
  issuerId: string | null;
  isActive: boolean;
  createdAt: string;
  lastUsedAt: string | null;
  assignedAt: string | null;
  limitationProfileId: string;
  limitationProfileName: string;
  unlimited: boolean;
  anonymous: boolean;
  employeeNumber: string | null;
  cardReadingNumber: string | null;
  physical: boolean;
}

export interface Capabilities {
  tokenId: string;
  itemNumber: string;
  amount: number;
  limitationType: string;
  sourceLimitationProfileId: string;
  collectively: true;
  unlimited: true;
  nominalCapability: number;
  currentCapability: number;
  expiresAt: string;
  productGroupId: string;
  sourceProductGroupId: string;
}

export interface CapabilitiesFilters {
  searchTerm: string | null;
}

export interface LimitationProfileTokenFilters {
  searchTerm: string;
  unlimited: boolean;
  anonymous: boolean;
}

export interface LimitationProfileToken {
  tokenId: string;
  anonymous: boolean;
  ownerId: string;
  ownerName: string;
  unlimited: boolean;
  limitationProfileId: string;
  limitationProfileName: string;
}

export interface TokenAssociatedWithLimitation {
  tokenId: string;
  tokenOwnerId: string;
  tokenOwnerName: string;
  isAnonymous: boolean;
  createdAt: string;
}

export interface LimitedToken {
  tokenId: string;
  anonymous: true;
  ownerId: string;
  ownerName: string;
  createdAt: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserDto {
  id: string;
  email: string;
  name: string;
  roleName: string;
  organizationId: string | null;
  phoneNumber: string | null;
}

export interface SubscriptionPlanVerification {
  canCreate: true;
  planAllocation: number;
  currentUsageCount: number;
}

export interface ImageType {
  id: string;
  url: string;
}

export const ApiBaseUrl = process.env.REACT_APP_API_ENDPOINT
  ? process.env.REACT_APP_API_ENDPOINT
  : `${window.location.origin}/api`;

// eslint-disable-next-line max-len
export const EmailValidationRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const PasswordValidationRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=+\-^$*.\[\]{}()?"!@#%&/\\,><':;|_~`])\S{8,99}$/;

export const OperatorNameToIdMap: { [domain: string]: string } = {
  bogmar: "7c92eb80",
  podbeskidzie: "bd8d1ce6",
  cucumber: "eb2b44ee",
};

export const RoleNames = {
  Admin: "admin",
  StoreKeeper: "storekeeper",
  OrganizationAdmin: "organizationAdmin",
  OrganizationEmployee: "organizationEmployee",
  OrganizationStorekeeper: "organizationStorekeeper",
};

export enum OrganizationRoleNames {
  OrganizationAdmin = "organizationAdmin",
  OrganizationEmployee = "organizationEmployee",
  OrganizationStorekeeper = "organizationStorekeeper",
}

export enum OperatorRoleNames {
  Admin = "admin",
  StoreKeeper = "storekeeper",
}

export const isOrganizationUser = (userRole: string): boolean =>
  Object.values(OrganizationRoleNames).includes(userRole);

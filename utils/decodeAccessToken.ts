import jwtDecode from 'jwt-decode';

const decodeAccessToken = (accessToken: string): any => {
  return jwtDecode<AccessTokenPayload>(accessToken);
};

export interface AccessTokenPayload {
  'custom:roleName': string;
  'cognito:username': string;
  email: string;
}

export default decodeAccessToken;

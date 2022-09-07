import { getLoggedUser, loginRequest } from "../api/Users";
import { FC, ReactNode, createContext, useEffect, useReducer } from "react";
import { useQueryClient } from "react-query";
import * as tokenStorage from "../lib/tokenStorage";
import decodeAccessToken from "../utils/decodeAccessToken";

interface User {
  id: string;
  name: string;
  email: string;
  role: string | null;
  organizationId: string | null;
}

const initialUserData: User = {
  id: "",
  name: "",
  email: "",
  role: null,
  organizationId: null,
};

interface AuthState {
  isAuthenticated: boolean | null;
  challengeName: boolean;
  sessionId: string;
  user: User;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

type InitialiseAction = {
  type: "INITIALISE";
  payload: {
    isAuthenticated: boolean;
    challengeName: boolean;
    user: User;
  };
};

type LoginAction = {
  type: "LOGIN";
  payload: {
    user: User;
    challengeName: boolean;
    sessionId: string;
  };
};

type LogoutAction = {
  type: "LOGOUT";
};

type Action = InitialiseAction | LoginAction | LogoutAction;

const initialAuthState: AuthState = {
  isAuthenticated: null,
  challengeName: false,
  sessionId: "",
  user: initialUserData,
};

const setSession = (accessToken: string, refreshToken: string): void => {
  tokenStorage.setAccessToken(accessToken);
  tokenStorage.setRefreshToken(refreshToken);
};

const clearSession = () => {
  tokenStorage.clear();
};

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "INITIALISE": {
      const { isAuthenticated, challengeName, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        challengeName,
        user,
      };
    }
    case "LOGIN": {
      const { user, challengeName, sessionId } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        challengeName,
        sessionId,
        user,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        challengeName: false,
        user: initialUserData,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext<AuthContextValue>({
  ...initialAuthState,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const login = async (email: string, password: string) => {
    try {
      const res = await loginRequest({
        email,
        password,
      });

      setSession(res.data.accessToken, res.data.refreshToken);

      let role: string | null = null;

      if (res.data.accessToken) {
        const decodedToken = decodeAccessToken(res.data.accessToken);
        role = decodedToken["custom:roleName"];
      }

      const user: User = {
        id: "",
        name: "",
        email,
        role,
        organizationId: null,
      };

      const challengeName = res.data?.challengeName === "NEW_PASSWORD_REQUIRED";

      dispatch({
        type: "LOGIN",
        payload: {
          user,
          challengeName,
          sessionId: res.data.sessionId,
        },
      });

      if (!challengeName) handleGetLoggedUser();
    } catch (err) {
      console.error(err.response.status);
    }
  };

  const logout = () => {
    clearSession();
    queryClient.clear();
    dispatch({ type: "LOGOUT" });
  };

  const handleGetLoggedUser = async () => {
    try {
      const accessToken = await tokenStorage.getAccessToken();

      if (accessToken) {
        const res = await getLoggedUser();
        const decodedToken = decodeAccessToken(accessToken);

        const user: User = {
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          role: decodedToken["custom:roleName"],
          organizationId: decodedToken["custom:organizationId"] ?? null,
        };

        dispatch({
          type: "INITIALISE",
          payload: {
            isAuthenticated: true,
            challengeName: false,
            user,
          },
        });
      } else {
        console.warn("wylogowano 1");
        dispatch({
          type: "INITIALISE",
          payload: {
            isAuthenticated: false,
            challengeName: false,
            user: initialUserData,
          },
        });
      }
    } catch (err) {
      console.warn("wylogowano 2");

      dispatch({
        type: "INITIALISE",
        payload: {
          isAuthenticated: false,
          challengeName: false,
          user: initialUserData,
        },
      });
    }
  };

  useEffect(() => {
    handleGetLoggedUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

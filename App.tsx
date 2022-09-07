import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./components/AuthContexts";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Logs } from "expo";
import * as Localization from "expo-localization";
import translations from "./utils/localization";
import { I18n, Scope, TranslateOptions } from "i18n-js";
import { createContext, useContext } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./theme";
import * as React from "react";

Logs.enableExpoCliLogging();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const i18n = new I18n(translations);

i18n.locale = Localization.locale;

interface LocalizationContextType {
  i18n: I18n;
}

const LocalizationContext = createContext({} as LocalizationContextType);
i18n.locale = "pl";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider theme={theme}>
        <LocalizationContext.Provider
          value={{
            i18n,
          }}
        >
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <SafeAreaProvider>
                <Navigation />
                <StatusBar />
              </SafeAreaProvider>
            </AuthProvider>
          </QueryClientProvider>
        </LocalizationContext.Provider>
      </PaperProvider>
    );
  }
}

export const useTranslation = () => {
  return useContext(LocalizationContext);
};

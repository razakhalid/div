import { createContext, useState } from "react";
import { cookieUtils } from "./utils";
import AppRouter from "./router";

export type AppContextType = {
  githubAccessToken?: string;
};

export const AppContext = createContext<AppContextType>({});

export default function App() {
  const [githubAccessToken] = useState(
    cookieUtils.getCookie("github_access_token"),
  );
  return (
    <AppContext.Provider value={{ githubAccessToken }}>
      <AppRouter />
    </AppContext.Provider>
  );
}

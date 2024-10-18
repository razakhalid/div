import { RouterProvider } from "react-router-dom";
import router from "./router";
import { createContext, useState } from "react";

export type AppContextType = {
  githubAccessToken?: string;
};

export const AppContext = createContext<AppContextType>({});

export default function App() {
  const [githubAccessToken] = useState(
    document.cookie
      .split("; ")
      .find((keyPair) => keyPair.startsWith("github_access_token"))
      ?.split("=")[1],
  );
  return (
    <AppContext.Provider value={{ githubAccessToken }}>
      <RouterProvider router={router}></RouterProvider>
    </AppContext.Provider>
  );
}

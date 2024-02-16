import { store } from "@/app/store";
import { ROUTES } from "@/constants/Routes";
import "@/styles/globals.css";
import { ThemeProvider, unstable_createMuiStrictModeTheme } from "@mui/material";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const theme = unstable_createMuiStrictModeTheme();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn && router.pathname !== ROUTES.login) {
      router.push(ROUTES.login);
    }
  }, [router]);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

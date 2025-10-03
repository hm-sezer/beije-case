"use client";

import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { store } from "@/store/store";
import { theme } from "@/app/theme";
import EmotionRegistry from "@/lib/registry";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmotionRegistry>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </Provider>
    </EmotionRegistry>
  );
}


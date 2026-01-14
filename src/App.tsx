import RootRoute from "./root-route";
import { ThemeProvider } from "./provider/theme-provider";
import SessionProvider from "./provider/session-provider";

function App() {
  return (
    <ThemeProvider>
      <SessionProvider>
        <RootRoute />
      </SessionProvider>
    </ThemeProvider>
  );
}

export default App;

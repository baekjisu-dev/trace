import RootRoute from "./root-route";
import { ThemeProvider } from "./provider/theme-provider";
import SessionProvider from "./provider/session-provider";
import ModalProvider from "./provider/modal-provider";

function App() {
  return (
    <ThemeProvider>
      <SessionProvider>
        <ModalProvider>
          <RootRoute />
        </ModalProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}

export default App;

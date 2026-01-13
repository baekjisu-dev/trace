import RootRoute from "./root-route";
import { ThemeProvider } from "./provider/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <RootRoute />
    </ThemeProvider>
  );
}

export default App;

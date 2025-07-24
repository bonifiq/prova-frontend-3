import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services";
//import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Widget } from "./components/Widget";
import "@mantine/core/styles.css";
import "./App.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider defaultColorScheme="light">
        <Widget />
        {/* DevTools apenas em desenvolvimento */}
        {/* {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />} */}
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;

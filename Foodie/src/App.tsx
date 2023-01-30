import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import AppRouter from "./Router/router";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <AppRouter />
      </div>
      ;
    </ChakraProvider>
  );
}

export default App;

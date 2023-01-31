import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import AppRouter from "./Router/router";
import NavBar from "./layout/Navbar/Navbar";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <NavBar />
        <AppRouter />
      </div>
    </ChakraProvider>
  );
}

export default App;

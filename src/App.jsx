import { useState } from "react";
import { Home } from "./components";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return <Home />;
}

export default App;
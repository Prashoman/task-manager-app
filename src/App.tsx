import { Outlet } from "react-router-dom";

import ScrollTopToButton from "./components/shared/ScrollTopToButton/ScrollTopToButton";
import NavBar from "./components/shared/Navbar/Navbar";

function App() {
  return (
    <>
      <NavBar />
      <Outlet />

      <ScrollTopToButton />
    </>
  );
}

export default App;

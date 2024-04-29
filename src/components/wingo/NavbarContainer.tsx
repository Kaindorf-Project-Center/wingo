import { Outlet } from "react-router";
import { Navbar } from "./Navbar";

const NavbarContainer = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default NavbarContainer;

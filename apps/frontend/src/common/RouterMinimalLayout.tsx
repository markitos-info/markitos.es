import React from "react";
import { Outlet } from "react-router-dom";
import NavBarMinimal from "./NavBarMinimal";

const RouterMinimalLayout: React.FC<object> = () => {
  return (
    <>
      <NavBarMinimal />
      <Outlet />
    </>
  );
};

export default RouterMinimalLayout;

import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import BackToTop from "./BackTop";

const RouterLayout: React.FC<object> = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <BackToTop />
    </>
  );
};

export default RouterLayout;

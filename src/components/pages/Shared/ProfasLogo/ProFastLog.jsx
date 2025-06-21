import React from "react";
import logo from "../../../../assets/brands/logo.png";
import { NavLink } from "react-router";


const ProFastLog = () => {
  return (
    <NavLink to={'/'}>
         <div className="flex items-end">
        <img className="mb-2 " src={logo} alt="" />
        <p className="text-3xl -ml-2 font-extrabold"> ProFast</p>
      </div>
    </NavLink>
  );
};

export default ProFastLog;

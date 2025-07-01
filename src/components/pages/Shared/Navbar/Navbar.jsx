import React from "react";
import { NavLink } from "react-router";
import ProFastLog from "../ProfasLogo/ProFastLog";
import { CiMenuBurger } from "react-icons/ci";
import useAuth from "../../../../hooks/useAuth";

const Navbar = () => {
  const { logOut, user } = useAuth();

  const hangleLogOut =()=> {
    logOut().then(() => {      
      alert('User LogOut Success')
    }).catch(error => {
      console.error(error)
    })
  }
  const navItem = (
    <>
      <li>
        <NavLink to={"/"}> Home </NavLink>
      </li>
      <li>
        <NavLink to={"/coverage"}> Coverage </NavLink>
      </li>
      <li>
        <NavLink to={"/aboutus"}> About Us </NavLink>
      </li>
      <li>
        <NavLink to={"/pricing"}> Pricing </NavLink>
      </li>
      {
        user && <>
         <li>
        <NavLink to={"/dashboard"}> Dashboard </NavLink>
      </li>
        </>
      }
      <li>
        <NavLink to={"/beARider"}> Be a Rider </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <CiMenuBurger size={24} />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {navItem}
            </ul>
          </div>
          <div className="btn btn-ghost text-xl">
            <ProFastLog></ProFastLog>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItem}</ul>
        </div>
        <div className="navbar-end">
          {user ?  <button onClick={hangleLogOut} className="btn">Logout</button> : <NavLink className={'btn'} to="/login">Login</NavLink>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

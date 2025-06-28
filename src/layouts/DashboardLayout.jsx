import React from "react";
import { NavLink, Outlet } from "react-router";
import ProFastLog from "../components/pages/Shared/ProfasLogo/ProFastLog";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      
      {/* Main content area */}
      <div className="drawer-content flex flex-col">
        {/* Mobile navbar */}
        <nav className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 text-xl font-semibold">Dashboard</div>
        </nav>

        {/* Page Content */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <aside className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <ProFastLog></ProFastLog>
          <li><a>Home</a>  </li>
          <li><NavLink to={'/dashboard/myParcels'}> My  Parcels </NavLink></li>
          <li><NavLink to={'/dashboard/myParcelss'}> My  Parcels </NavLink></li>
        </ul>
      </aside>
    </div>
  );
};

export default DashboardLayout;

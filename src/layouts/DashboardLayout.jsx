import React from "react";
import { NavLink, Outlet } from "react-router";
import ProFastLog from "../components/pages/Shared/ProfasLogo/ProFastLog";

// Import icons from react-icons
import {
  FaHome,
  FaBox,
  FaHistory,
  FaSearchLocation,
  FaUserEdit,
} from "react-icons/fa";

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
          <ProFastLog />
          <li>
            <NavLink to="/dashboard/home">
              <FaHome size={25} className="mr-2 inline" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myParcels">
              <FaBox size={25} className="mr-2 inline" />
              My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory">
              <FaHistory size={25} className="mr-2 inline" />
              Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/Trac">
              <FaSearchLocation size={25} className="mr-2 inline" />
              Trac a Package
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile">
              <FaUserEdit size={25} className="mr-2 inline" />
              Update Profile
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/makeAdmin">
              <FaUserEdit size={25} className="mr-2 inline" />
             Make Admin 
            </NavLink>
          </li>
          {/* New: Active Riders */}
          <li>
            <NavLink to="/dashboard/activeRiders">
              <FaUserEdit size={25} className="mr-2 inline text-green-600" />
              Active Riders
            </NavLink>
          </li>

          {/* New: Pending Riders */}
          <li>
            <NavLink to="/dashboard/pendingRiders">
              <FaUserEdit size={25} className="mr-2 inline text-yellow-500" />
              Pending Riders
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default DashboardLayout;

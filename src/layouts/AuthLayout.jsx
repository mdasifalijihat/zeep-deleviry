import React from "react";
import { Outlet } from "react-router";
import authImg from '../assets/authImage.png'
import ProFastLog from "../components/pages/Shared/ProfasLogo/ProFastLog";

const AuthLayout = () => {
  return (
    <div>
      <div className="p-12 bg-base-200 ">
       <div>
         <ProFastLog></ProFastLog>
       </div>
        <div className="hero-content flex-col lg:flex-row-reverse">
         <div className="flex-1">
             <img
            src={authImg}
          />
         </div>
          <div className="flex-1">
               <Outlet></Outlet>        
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

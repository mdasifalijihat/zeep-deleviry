import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/pages/Shared/Navbar/Navbar';
import Footer from '../components/pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;
import React from 'react';
import Banner from './Banner';
import HowWorks from '../How It Works/HowWorks';
import Services from './services/Services';
import LogoSwiper from './LogoSwiper/LogoSwiper';
import CustomerSupport from './Support/CustomerSuppert';
import Merchant from './merchant/Merchant';
import CustomerReview from './customerReview/CustomerReview';
import Faq from './Faq/Faq';


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <HowWorks></HowWorks>
           <Services></Services>
           <LogoSwiper></LogoSwiper>
           <CustomerSupport></CustomerSupport>
           <Merchant></Merchant>
           <CustomerReview></CustomerReview>
           <Faq></Faq>
        </div>
    );
};

export default Home;
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

// ────────────────────────────────────────────────
//  Logo assets (replace with your actual paths)
// ────────────────────────────────────────────────
import logo1 from "../../../../assets/brands/amazon.png";
import logo2 from "../../../../assets/brands/amazon_vector.png";
import logo3 from "../../../../assets/brands/casio.png";
import logo4 from "../../../../assets/brands/moonstar.png";
import logo5 from "../../../../assets/brands/randstad.png";
import logo6 from "../../../../assets/brands/start-people 1.png";
import logo7 from "../../../../assets/brands/start.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

// ────────────────────────────────────────────────
//  <LogoSwiper />
//  Continuous right‑to‑left swiper of client logos
// ────────────────────────────────────────────────
const LogoSwiper = () => (
  <section className="overflow-hidden bg-base-100 py-12">
    <h2 className="text-center text-2xl font-semibold mb-6">Trusted By</h2>

    <Swiper
      modules={[Autoplay]}
      slidesPerView={2}
      spaceBetween={40}
      loop={true}
      speed={6000} // higher = slower frame‑rate but faster slide movement
      autoplay={{ delay: 0, disableOnInteraction: false }}
      grabCursor={false}
      allowTouchMove={false}
      breakpoints={{
        640: { slidesPerView: 3 },
        1024: { slidesPerView: 5 },
      }}
      className="w-full"
    >
      {/* duplicate logos array for seamless loop */}
      {[...logos, ...logos].map((logo, idx) => (
        <SwiperSlide key={idx} className="flex items-center justify-center">
          <img src={logo} alt={`Client logo ${idx + 1}`} className="h-16 w-32 object-contain" />
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default LogoSwiper;

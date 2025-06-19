import React, { useState } from "react";
import reviews from "../../../../../public/reviews.json";              

/* ────────── Swiper setup ────────── */
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/* ────────── Component ────────── */
export default function CustomerReview() {
  const [active, setActive] = useState(0);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-6">
      {/* heading */}
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold text-teal-900 md:text-4xl">
          What our customers are saying
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-teal-700">
          Enhance posture, mobility, and well‑being effortlessly with Posture Pro.
          Achieve proper alignment, reduce pain, and strengthen your body with ease!
        </p>
      </div>

      {/* slider */}
      <Swiper
        modules={[Navigation, Pagination]}
        centeredSlides
        loop
        spaceBetween={24}
        slidesPerView={1.2}                    /* show hint of left/right card */
        onSlideChange={(s) => setActive(s.realIndex)}
        navigation={{
          nextEl: ".review-next",
          prevEl: ".review-prev",
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 1.6 },
          1024: { slidesPerView: 2.1 }
        }}
        className="[&_.swiper-pagination-bullet]:!bg-lime-500"
      >
        {reviews.map((r, i) => (
          <SwiperSlide key={r.id} className="!flex justify-center">
            <article
              /* centre card = clear ; sides = blurred & faded */
              className={`w-full max-w-md rounded-2xl bg-white p-8 shadow transition-all duration-300
                ${active === i ? "opacity-100 blur-0" : "opacity-40 blur-[2px]"}
              `}
            >
              <p className="mb-6 text-sm leading-relaxed text-slate-600 before:mb-2 before:block before:text-4xl before:text-teal-400 before:content-['“']">
                {r.quote}
              </p>

              <hr className="mb-6 border-dashed" />

              {/* author block */}
              <div className="flex items-center gap-4">
                {/* avatar (solid circle fallback) */}
                {r.avatar.startsWith("#") ? (
                  <span
                    className="inline-block h-12 w-12 shrink-0 rounded-full"
                    style={{ backgroundColor: r.avatar }}
                    aria-hidden="true"
                  />
                ) : (
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="h-12 w-12 shrink-0 rounded-full object-cover"
                  />
                )}

                <div>
                  <h4 className="font-semibold text-teal-900">{r.name}</h4>
                  <span className="text-xs text-slate-500">{r.title}</span>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}

        {/* nav buttons */}
        <button
          className="review-prev absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md
                     transition hover:bg-slate-100 md:left-0"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#0f766e" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <button
          className="review-next absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-lime-400 p-2
                     shadow-md transition hover:bg-lime-300 md:right-0"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="#064e3b" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </Swiper>
    </section>
  );
}

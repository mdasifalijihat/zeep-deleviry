import React from "react";

/*
  ───────────────────────────────────────────────
  Merchant Hero Section
  Tailwind v3+  •  React 18+
  ───────────────────────────────────────────────
*/
export default function Merchant() {
  return (
    <section data-aos="flip-up" className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-teal-900 px-6 py-16 text-white shadow-lg md:px-14 my-12">
      {/* decorative radial glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-80 w-[140%] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,255,255,0.6), transparent 70%)",
        }}
      />

      {/* content grid */}
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* ⬅ left column */}
        <div>
          <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
            Merchant and Customer Satisfaction
            <br className="hidden sm:block" /> is Our First Priority
          </h2>

          <p className="mt-6 max-w-lg text-base/relaxed text-teal-100">
            We offer the lowest delivery charge with the highest value along
            with 100% safety of your product. Pathao courier delivers your
            parcels in every corner of Bangladesh right on time.
          </p>

          {/* buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button className="inline-flex items-center justify-center rounded-full bg-lime-400 px-8 py-3 text-sm font-semibold text-teal-900 transition hover:bg-lime-300">
              Become a Merchant
            </button>
            <button className="inline-flex items-center justify-center rounded-full border-2 border-lime-400 px-8 py-3 text-sm font-semibold text-lime-300 transition hover:bg-lime-400 hover:text-teal-900">
              Earn with Profast Courier
            </button>
          </div>
        </div>

        {/* ➡ right column */}
        <div className="mx-auto w-full max-w-md md:mx-0">
          {/* replace src with your own SVG/PNG/Illustration */}
          <img
            src="/assets/parcel-outline.svg"
            alt="Parcel boxes with location pin"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}

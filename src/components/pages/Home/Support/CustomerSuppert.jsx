import React from "react";
import { Truck, PackageCheck, Headset } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Live Parcel Tracking",
    desc:
      "Stay updated in real‑time with our live parcel‑tracking feature. From pick‑up to delivery, monitor instant status updates for complete peace of mind.",
    icon: Truck,
  },
  {
    id: 2,
    title: "100% Safe Delivery",
    desc:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination—guaranteeing safe, damage‑free delivery every time.",
    icon: PackageCheck,
  },
  {
    id: 3,
    title: "24/7 Call Center Support",
    desc:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or concerns—anytime you need us.",
    icon: Headset,
  },
];

export default function CustomerSupport() {
  return (
    <section data-aos="zoom-in-up" className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white/80 p-8 shadow-sm py-8 my-8">
      {/* `divide-y` draws horizontal rules; `space-y` makes the gaps */}
      <div className="space-y-8 divide-y divide-slate-200">
        {features.map(({ id, title, desc, icon: Icon }) => (
          <article key={id} className="flex flex-col gap-6 pt-8 first:pt-0 md:flex-row">
            {/* icon */}
            <div className="mx-auto flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-slate-50 ring-1 ring-slate-100">
              <Icon size={40} strokeWidth={1.6} />
            </div>

            {/* text (with an optional vertical divider on md+) */}
            <div className="md:ml-6 md:pl-6 md:border-l md:border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">{desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

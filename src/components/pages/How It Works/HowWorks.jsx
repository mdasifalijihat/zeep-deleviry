import React from "react";
import { FaCar, FaClock, FaRegCheckCircle } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineLocalShipping } from "react-icons/md";

const steps = [
  {
    icon: FaCar,
    title: "Book Pick‑up",
    desc: "Choose a pickup time and location in seconds.",
  },
  {
    icon: FaClock,
    title: "We Collect",
    desc: "A rider arrives right on schedule to collect your parcel.",
  },
  {
    icon: MdOutlineLocalShipping,
    title: "In Transit",
    desc: "Track your package live—with zero hassle.",
  },
  {
    icon: TbTruckDelivery,
    title: "Delivered",
    desc: "Receiver gets it on time—every time.",
  },
];

const HowWorks = () => (
  <section className="max-w-6xl mx-auto px-4 py-12">
    <h2 className="text-3xl font-semibold text-center mb-8">How&nbsp;It&nbsp;Works</h2>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {steps.map(({ icon: Icon, title, desc }) => (
        <div
          key={title}
          className="card bg-base-100 shadow-sm border border-base-200 transition-colors duration-300 cursor-pointer hover:bg-orange-500 hover:text-white group"
        >
          <div className="card-body gap-3 items-center text-center">
            <Icon size={32} className="text-primary group-hover:text-white" />
            <h3 className="card-title text-lg">{title}</h3>
            <p className="text-sm">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default HowWorks;

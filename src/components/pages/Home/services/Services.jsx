import React from "react";
import {
  FaShippingFast,
  FaGlobeAmericas,
  FaWarehouse,
  FaMoneyBillWave,
  FaBuilding,
  FaUndoAlt,
} from "react-icons/fa";
import ServiceCard from "./ServiceCard";

const servicesData = [
  {
    title: "Express & Standard Delivery",
    description:
      "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick‑up to drop‑off.",
    icon: FaShippingFast,
    color: "text-red-500",
  },
  {
    title: "Nationwide Delivery",
    description:
      "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    icon: FaGlobeAmericas,
    color: "text-green-500",
  },
  {
    title: "Fulfillment Solution",
    description:
      "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    icon: FaWarehouse,
    color: "text-blue-500",
  },
  {
    title: "Cash on Home Delivery",
    description:
      "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    icon: FaMoneyBillWave,
    color: "text-yellow-500",
  },
  {
    title: "Corporate Service / Contract In Logistics",
    description:
      "Customized corporate services which includes warehouse and inventory management support.",
    icon: FaBuilding,
    color: "text-purple-500",
  },
  {
    title: "Parcel Return",
    description:
      "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    icon: FaUndoAlt,
    color: "text-pink-500",
  },
];

const Services = () => (
  <section className="max-w-6xl mx-auto px-4 py-12">
    {/* Section heading */}
    <div className="text-center mb-10">
      <h2 className="text-3xl font-semibold mb-2">Our Services</h2>
      <p className="text-gray-600 max-w-xl mx-auto">
        Enjoy fast, reliable parcel delivery with real‑time tracking and zero
        hassle. From personal packages to business shipments, we deliver on
        time—every time.
      </p>
    </div>

    {/* Services grid */}
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {servicesData.map((service) => (
        <ServiceCard key={service.title} {...service} />
      ))}
    </div>
  </section>
);

export default Services;

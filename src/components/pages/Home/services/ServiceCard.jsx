
import React from "react";

const ServiceCard = ({ title, description, icon: Icon, color }) => (
  <div className="card bg-base-100 shadow-md border border-base-200 hover:bg-orange-300 transition-colors duration-300">
    <div className="card-body gap-4 items-center text-center">
      <Icon size={28} className={color} />
      <h3 className="card-title text-lg justify-center">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default ServiceCard;


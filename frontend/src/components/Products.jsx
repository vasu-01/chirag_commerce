import React from "react";
import { useNavigate } from "react-router-dom";

export default function Products({ details }) {
  const navigate = useNavigate();
  return (
    <div>
      {details.length === 0 ? (
        <p className="text-gray-600 text-xl font-medium text-center mt-5">
          No products yet. Add product to see here.
        </p>
      ) : (
        <div className="flex flex-wrap gap-6 mt-8 cursor-pointer">
          {details.map((cont, idx) => (
            <div
              key={idx}
              className="border rounded-lg w-80 h-111 flex  flex-col p-[10px]"
              onClick={() => navigate(`/product/${cont._id}`)}
            >
              <img src={cont.bannerImg} alt="" className="h-70  w-full" />
              <div className="p-[4px]">
                <div className=" flex justify-between mt-5 ">
                  <h2 className="text-xl">
                    <b> $ {cont.price.toLocaleString()}</b>
                  </h2>
                  <span>
                    <b>Eco</b>: {cont.eco}/100
                  </span>
                </div>
                <p className="text-sm text-gray-500 font-medium mt-3 mb-2">
                  {cont.year}
                  {cont.category === "Car" || cont.category === "Bike"
                    ? `-${cont.km}`
                    : ""}
                </p>
                <p className="text-sm text-gray-500 font-medium mb-2">
                  {cont.name}
                </p>
                <div className="text-sm text-gray-500 font-medium flex justify-between">
                  <p className=" ">{cont.location}</p>
                  <span>{cont.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import React from "react";
import Image from "../assets/errorImage.jpg";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[100vh] bg-white items-center flex justify-center px-5 lg:px-0">
      <div className="w-[415px] text-center flex-col items-center justify-center mx-auto gap-[100px]">
        <div className="mb-8 md:mb-[56px]">
          <div className="max-w-[312px] w-full h-[160px] relative flex justify-center items-center mx-auto">
            <img src={Image} fill alt="404" />
          </div>
        </div>
        <div className="mt-20">
          <h3 className=" text-4xl md:text-[56px] leading-[64px] text-[#1A1C16]">
            Page Not Found
          </h3>
        </div>
        <div className="flex flex-col gap-6 mt-3">
          <div className="text-center">
            <p className="text-base leading-6 tracking-wider font-sans">
              The page you are looking for might have been removed had its name
              changed or is temporarily unavailable.
            </p>
          </div>
          <div>
            <button
              onClick={() => navigate("/browse")}
              className="bg-[#23d160] text-white font-sans max-w-[146px] w-full h-[48px] rounded-[100px] font-medium text-sm"
            >
              Home Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;

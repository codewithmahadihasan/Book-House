import React from "react";
import Lottie from "lottie-react";
import data from "./data?.json";

const Loading = () => {
  return (
    <div className=" flex justify-center items-center py-52">
      <div className="w-96">
        <Lottie animationData={data} loop={true} />
      </div>
    </div>
  );
};

export default Loading;

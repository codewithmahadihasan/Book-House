import React from "react";
import Lottie from "lottie-react";
import data from "./data2.json";

const Loader = () => {
  return (
    <div>
      <div className=" flex justify-center items-center py-52">
        <div className="w-96">
          <Lottie animationData={data} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Loader;

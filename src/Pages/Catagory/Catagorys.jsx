import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";

import Modal from "./Modal";
import Card from "./Card";

const Catagorys = () => {
  const datas = useLoaderData();
  const [tost, setTost] = useState();
  console.log(tost);
  console.log(datas);
  return (
    <div id="catagory">
      <section className="bg-white ">
        <div className="container px-6 py-8 mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl ">
            Our Team
          </h2>

          <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {datas.map((data) => (
              <Card data={data} key={data?._id} setTost={setTost}></Card>
            ))}
          </div>
        </div>
      </section>
      <Modal data={tost} setTost={setTost}></Modal>
    </div>
  );
};

export default Catagorys;

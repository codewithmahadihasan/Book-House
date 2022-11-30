import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/AuthProvider";

const AddProduct = () => {
  const { user } = useContext(AuthContext);
  const key = process.env.REACT_APP_imgBB;
  const navigate = useNavigate();
  const [datas, setDatas] = useState();
  const { email } = user;
  useEffect(() => {
    fetch(`https://serversite-liart.vercel.app/user/${email}`)
      .then((res) => res.json())
      .then((data) => setDatas(data));
  }, [email]);
  console.log(datas?.verify);
  // date
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  const time = current.toLocaleTimeString("en-US");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const email = user?.email;
    const photo = user.photoURL;
    const name = user.displayName;
    const image = data?.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const verify = datas?.verify;
    console.log(verify);

    const url = `https://api.imgbb.com/1/upload?key=${key}`;
    console.log(url);
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imagedata) => {
        const addItem = {
          data,
          catagory: data?.catagorys,
          email,
          image: imagedata?.data?.url,
          photo,
          name,
          date,
          time,
          verify,
        };
        fetch("https://serversite-liart.vercel.app/catagorys", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(addItem),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.acknowledged > 0) {
              Swal.fire(
                "Add Products Sucessfully",
                "Thank you very much",
                "success"
              );
              navigate("/dashboard/my-products");
            }
          });
      });
  };
  return (
    <div className="bg-gray-500 px-20 py-10">
      <h1 className="text-5xl font-bold text-center py-6">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 gap-x-10">
          <div>
            <label>
              <p className="label-text">Product Name</p>
            </label>
            <input
              placeholder="Input Your Product Name"
              {...register("name", { required: "Please provide your name" })}
              type="text"
              className=" rounded-lg border-gray-200 p-3 text-sm w-full"
            />
            <p className="pt-2">
              {errors.name && (
                <span className="text-red-400 ">{errors.name.message}</span>
              )}
            </p>
          </div>
          <div>
            <label>
              <p className="label-text">Phone Number</p>
            </label>
            <input
              defaultValue={"+880"}
              {...register("number", {
                required: "Please Provide Your Phone Number",
              })}
              type="text"
              className=" rounded-lg border-gray-200 p-3 text-sm w-full"
            />
            <p className="pt-2">
              {errors.number && (
                <span className="text-red-400 ">{errors.number.message}</span>
              )}
            </p>
          </div>
          <div>
            <label>
              <p className="label-text">Price</p>
            </label>
            <input
              placeholder="Input Your Product Price"
              {...register("price", { required: "Please provide new price" })}
              type="number"
              className=" rounded-lg border-gray-200 p-3 text-sm w-full"
            />
            <p className="pt-2">
              {errors.price && (
                <span className="text-red-400 ">{errors.price.message}</span>
              )}
            </p>
          </div>
          <div>
            <label>
              <p className="label-text">Original Price</p>
            </label>
            <input
              placeholder="Input Your Product Old Price"
              {...register("oldPrice", {
                required: "Please provide old Price",
              })}
              type="number"
              className=" rounded-lg border-gray-200 p-3 text-sm w-full"
            />
            <p className="pt-2">
              {errors.oldPrice && (
                <span className="text-red-400 ">{errors.oldPrice.message}</span>
              )}
            </p>
          </div>

          <div>
            <label>
              <p className="label-text">Catagorys</p>
            </label>
            <select
              className="rounded-lg border-gray-200  text-lg w-full p-3"
              {...register("catagorys")}
            >
              <option className="text-lg " disabled value="select">
                Select
              </option>
              <option value="Horror">Horror</option>
              <option value="Education">Education</option>
              <option value="Detective">Detective</option>
              <option value="Thriller">Thriller</option>
            </select>
            <p className="pt-2">
              {errors.catagorys && (
                <span className="text-red-400 ">
                  {errors.catagorys.message}
                </span>
              )}
            </p>
          </div>
          <div>
            <label>
              <p className="label-text">Location</p>
            </label>
            <input
              placeholder="Input Your Location"
              {...register("location", {
                required: "Please input your location",
              })}
              type="text"
              className=" rounded-lg border-gray-200 p-3 text-sm w-full"
            />
            <p className="pt-2">
              {errors.location && (
                <span className="text-red-400 ">{errors.location.message}</span>
              )}
            </p>
          </div>
          <div>
            <label>
              <p className="label-text">Condition</p>
            </label>
            <input
              placeholder="Input Your Product Condition Right Now"
              {...register("condition", {
                required: "Please provide Condition",
              })}
              type="text"
              className=" rounded-lg border-gray-200 p-3 text-sm w-full"
            />
            <p className="pt-2">
              {errors.condition && (
                <span className="text-red-400 ">
                  {errors.condition.message}
                </span>
              )}
            </p>
          </div>
          <div>
            <label>
              <p className="label-text">Duration</p>
            </label>
            <input
              placeholder="Input Product Duration Time"
              {...register("duration", {
                required: "Please provide duration",
              })}
              type="text"
              className=" rounded-lg border-gray-200 p-3 text-sm w-full"
            />
            <p className="pt-2">
              {errors.duration && (
                <span className="text-red-400 block ">
                  {errors.duration.message}
                </span>
              )}
            </p>
          </div>
          <div className="pb-4">
            <label htmlFor="files" className="block text-sm font-medium">
              Photo
            </label>
            <div className="flex">
              <input
                {...register("image", {
                  required: "Please provide your photo",
                })}
                type="file"
                className="px-8 py-12 border-2 border-dashed rounded-md  text-gray-400 "
              />
            </div>
            <p className="pt-2">
              {errors.image && (
                <span className="text-red-400 ">{errors.image.message}</span>
              )}
            </p>
          </div>
        </div>

        <input
          className="bg-purple-400 hover:bg-purple-700 px-10 py-2"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddProduct;

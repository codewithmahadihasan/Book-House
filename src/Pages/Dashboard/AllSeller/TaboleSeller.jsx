import React, { useState } from "react";
import Modal2 from "./Modal2";
import { GoVerified } from "react-icons/go";

const TaboleSeller = ({ user, handaleDelete, i, handaleVerify }) => {
  const [seller, setSeller] = useState();
  return (
    <tr key={user._id}>
      <td className="font-semibold">{i + 1}</td>
      <td className="p-2 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
            <img
              className="rounded-full w-10 h-10"
              src={user?.photoURL}
              alt="Alex Shatov"
            />
          </div>
          <div className="font-medium text-gray-800 flex items-center gap-1">
            {user.name}{" "}
            {user.verify && <GoVerified className="text-xs"></GoVerified>}
          </div>
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">{user?.email}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left font-medium text-green-500">
          {user.verify ? (
            <p>Verifyed Seller</p>
          ) : (
            <button
              onClick={() => handaleVerify(user?.email)}
              className="btn btn-xs"
            >
              Verify
            </button>
          )}
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-lg text-center">
          <label
            htmlFor="my-modal-4"
            onClick={() => setSeller(user)}
            className="btn btn-xs bg-red-500 border-0 hover:bg-red-800"
          >
            Delete
          </label>
        </div>
      </td>
      {seller && <Modal2 handaleDelete={handaleDelete} user={user}></Modal2>}
    </tr>
  );
};

export default TaboleSeller;

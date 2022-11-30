import React, { useState } from "react";
import Modal from "./Modal";

const TableForBuyer = ({ user, handaleDelete, i }) => {
  const [deleteBuyer, setBuyer] = useState();

  return (
    <tr key={user._id}>
      <td className="p-2 whitespace-nowrap">
        <div className="font-medium text-gray-800">{i + 1}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
            <img
              className="rounded-full w-10 h-10"
              src={user?.photoURL}
              alt="Alex Shatov"
            />
          </div>
        </div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="font-medium text-gray-800">{user?.name}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left">{user?.email}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <div className="text-left font-medium text-green-500">{user.role}</div>
      </td>
      <td className="p-2 whitespace-nowrap">
        <label
          htmlFor="my-modal-3"
          onClick={() => setBuyer(user)}
          className="btn btn-xs bg-red-500 border-0 hover:bg-red-800"
        >
          Delete
        </label>
      </td>
      {deleteBuyer && <Modal handaleDelete={handaleDelete} user={user}></Modal>}
    </tr>
  );
};

export default TableForBuyer;

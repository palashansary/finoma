import React, { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "../store/authSlice";
import { auth } from "../firebase/firebase";

const Table_Head = [
  "Name",
  "Category",
  "Date of Expanses",
  "Amount",
  "Updated At",

  "Created By",
  "Actions ",
];

const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
};
function convertDate(time) {
  //time should be server timestamp seconds only
  let dateInMillis = time * 1000;
  let date = new Date(dateInMillis);
  let myDate = new Intl.DateTimeFormat("en-IN", options).format(date);
  let myTime = date.toLocaleTimeString();
  // myDate = myDate.replaceAll('/', '-')
  return `${myDate} ${myTime}`;
}

export default function Table({ expenseList, onDelete, onEdit }) {
  const user = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email }));
      }
    });
  }, []);

  return (
    <div className="  flex justify-center ">
      <div className="pt-[30px] w-[90%] md:w-[90%] lg:w-[80%] ">
        <div className=" overflow-y-scroll md:overflow-hidden ">
          <table className="min-w-full border-collapse block md:table ">
            <thead className="block md:table-header-group  ">
              <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
                {Table_Head.map((headerName, index) => (
                  <th
                    key={index}
                    className="bg-gray-500 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell"
                  >
                    {headerName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="block md:table-row-group ">
              {expenseList.map((data, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-gray-300 mb-6 border border-grey-500 md:border-none block md:table-row"
                  >
                    <td className="px-2 py-4 md:border md:border-grey-500 block md:table-cell border-b border-white">
                      <div className="px-[5%] flex justify-between">
                        <span className="inline-block w-1/2 md:hidden font-bold">
                          {Table_Head[0]}
                        </span>
                        <span className="text-end md:text-start">
                          {data?.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-2 md:border md:border-grey-500 block md:table-cell border-b border-white">
                      <div className="px-[5%] flex justify-between">
                        <span className="inline-block w-1/2 md:hidden font-bold">
                          {Table_Head[1]}
                        </span>
                        <span className="text-end md:text-start">
                          {data?.category}
                        </span>
                      </div>
                    </td>
                    <td className="p-2 md:border md:border-grey-500 block md:table-cell border-b border-white">
                      <div className="px-[5%] flex justify-between">
                        <span className="inline-block w-1/2 md:hidden font-bold">
                          {Table_Head[2]}
                        </span>
                        <span className="text-end md:text-start">
                          {data?.dateOfExpenses}
                        </span>
                      </div>
                    </td>
                    <td className="p-2 md:border md:border-grey-500 block md:table-cell border-b border-white">
                      <div className="px-[5%] flex justify-between">
                        <span className="inline-block w-1/2 md:hidden font-bold">
                          {Table_Head[3]}
                        </span>
                        <span className="text-end md:text-start">
                          {data?.amount}
                        </span>
                      </div>
                    </td>
                    <td className="p-2 md:border md:border-grey-500 block md:table-cell border-b border-white">
                      <div className="px-[5%] flex justify-between">
                        <span className="inline-block w-1/2 md:hidden font-bold">
                          {Table_Head[4]}
                        </span>
                        <span className="text-end md:text-start">
                          {data.updatedAt &&
                            convertDate(data?.updatedAt?.seconds)}
                        </span>
                      </div>
                    </td>
                    <td className="p-2 md:border md:border-grey-500 block md:table-cell border-b border-white">
                      <div className="px-[5%] flex justify-between">
                        <span className="inline-block w-1/2 md:hidden font-bold">
                          {Table_Head[5]}
                        </span>
                        <span className="text-end md:text-start">
                          {user?.email === data?.createdBy
                            ? "me"
                            : data.createdBy}
                        </span>
                      </div>
                    </td>

                    <td className="p-2 flex justify-between items-center md:border md:border-grey-500  md:table-cell border-b border-white">
                      <div className="pl-[5%] font-bold  md:hidden">
                        {Table_Head[6]}
                      </div>
                      {user && user?.email === data?.createdBy && (
                        <div className="px-[5%] flex justify-end gap-4">
                          <button className="">
                            <MdModeEdit
                              onClick={() => onEdit(data.id)}
                              className="text-[1.8rem] md:text-[2rem]"
                            />
                          </button>
                          <button
                            className=" text-red-500 "
                            onClick={() => onDelete(data.id)}
                          >
                            <MdDelete className="text-[1.8rem] md:text-[2rem]" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const StatusWork = () => {
  const [notify, setNotify] = useState("");
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const API_URL = "/api/eduStatus";

  const handleAdd = async () => {
    if (title == "") {
      setNotify(toast.error("الرجاء عليك استكمال جميع البيانات"));
    } else {
      const res = await axios.post(API_URL, { title });
      //window.location.reload()
      console.log(res);
      setNotify(toast.success("تم اضافة البيانات"));
      setTitle("");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(API_URL);
      console.log(res);
      setData(res?.data?.data);
    };
    fetchData();
  }, [title]);
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/${id}`);
      console.log(res);

      if (res?.data) {
        setNotify(toast.success("تم حذف البيانات"));
        setTitle(null);
      }
    } catch (error) {
      setNotify(toast.error(error?.response?.data?.message));
    }
  };
  return (
    <div className=" container flex flex-col  w-1/2  p-5 items-center ">
      <div>
        <span className="text-white">{notify}</span>
        <ToastContainer position="top-right" />
      </div>
      <h1 className="p-2 bg-gray-950 rounded-md text-white font-bold mb-2 w-1/2  mt-32">
        الحالة التعليمية
      </h1>
      <div className="flex flex-row w-1/2 ">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="اضافة حالة تعليمية جديدة"
          className="border-2 border-gray-100 p-2 bg-gray-800 w-full"
        />
        <button
          className="bg-cyan-700 p-1 text-white cursor-pointer"
          onClick={() => handleAdd()}>
          اضافة
        </button>
      </div>
      <div className="w-1/2 h-80 overflow-y-auto">
        {data ? (
          data &&
          data?.map((x, i) => (
            <div
              key={i}
              className="p-1 flex flex-row justify-between rounded-md w-full bg-black text-white mt-2 ">
              <span>{x.title}</span>
              <button
                className="p-1 bg-red-500"
                onClick={() => handleDelete(x?._id)}>
                حذف
              </button>
            </div>
          ))
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
};

export default StatusWork;

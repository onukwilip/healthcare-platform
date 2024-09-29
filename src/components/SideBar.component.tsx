"use client";
import React, { useState } from "react";
import Form from "./Form.component";
import InfrastructureDataList from "./InfrastructureDataList.component";

const SideBar = () => {
  const [expand, setExpand] = useState(true);

  return (
    <div className="max-h-[97vh] p-3 rounded-md absolute top-4 right-4 bg-white shadow-lg w-[400px] flex flex-col gap-4 overflow-x-hidden overflow-y-auto">
      <div className="flex w-full items-center justify-between gap-4">
        <span className="font-thin text-lg capitalize">
          Filter healthcare centres within Anambra state
        </span>
        <div>
          <i
            className={`fa-solid fa-caret-right cursor-pointer text-lg transition ${
              expand ? "rotate-90" : ""
            }`}
            onClick={() => setExpand((prev) => !prev)}
          ></i>
        </div>
      </div>
      {expand && (
        <div className="w-full flex flex-col gap-3">
          <Form />
          <InfrastructureDataList />
        </div>
      )}
    </div>
  );
};

export default SideBar;

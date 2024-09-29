"use client";
import React from "react";
import Form from "./Form.component";
import InfrastructureDataList from "./InfrastructureDataList.component";

const SideBar = () => {
  return (
    <div className="h-[97vh] p-3 rounded-md absolute top-4 right-4 bg-white shadow-lg w-[400px] flex flex-col gap-10">
      <Form />
      <InfrastructureDataList />
    </div>
  );
};

export default SideBar;

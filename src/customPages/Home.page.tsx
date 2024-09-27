"use client";
import Map from "@/components/Map.component";
import SideBar from "@/components/SideBar.component";
import React from "react";

const Home = () => {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <Map />
      <SideBar />
    </div>
  );
};

export default Home;

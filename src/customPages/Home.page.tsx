"use client";
import Map from "@/components/Map.component";
import SideBar from "@/components/SideBar.component";
import { useMapContext } from "@/contexts/MapContext.context";
import React from "react";
import { Marker } from "@react-google-maps/api";
import HospitalMarker from "@/components/HospitalMarker.component";

const Home = () => {
  const { hospitals } = useMapContext();

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <Map>
        {hospitals?.map((hospital) => (
          <HospitalMarker hospital={hospital} />
        ))}
      </Map>
      <SideBar />
    </div>
  );
};

export default Home;

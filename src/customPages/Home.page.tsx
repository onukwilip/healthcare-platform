"use client";
import Map from "@/components/Map.component";
import SideBar from "@/components/SideBar.component";
import { useMapContext } from "@/contexts/MapContext.context";
import React from "react";
import { Marker } from "@react-google-maps/api";
import HospitalMarker from "@/components/InfrastructureMarker.component";
import InfrastructureInfoWindow from "@/components/InfrastructureInfoWindow.component";

const Home = () => {
  const { infrastructures: hospitals } = useMapContext();

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <Map>
        {hospitals?.map((hospital) => (
          <HospitalMarker infrastructure={hospital} key={hospital.id} />
        ))}
        <InfrastructureInfoWindow />
      </Map>
      <SideBar />
    </div>
  );
};

export default Home;

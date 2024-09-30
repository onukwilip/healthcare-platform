"use client";
import Map from "@/components/Map.component";
import SideBar from "@/components/SideBar.component";
import { useMapContext } from "@/contexts/MapContext.context";
import React from "react";
import { Circle, Marker, MarkerClusterer } from "@react-google-maps/api";
import HospitalMarker from "@/components/InfrastructureMarker.component";
import InfrastructureInfoWindow from "@/components/InfrastructureInfoWindow.component";
import NeighbourhoodMarker from "@/components/NeighbourhoodMarker.component";
import Circles from "@/components/Circles.component";
import OSMNeighbourhoodMarker from "@/components/OSMNeighbourhoodMarker.component";
import NeighbourhoodPolygon from "@/components/NeighbourhoodPolygon.component";

const Home = () => {
  const {
    infrastructures,
    nearby_neighbourhoods,
    // display_circles,
  } = useMapContext();

  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <Map>
        {infrastructures?.map((infrastructure) => (
          <HospitalMarker
            infrastructure={infrastructure}
            key={infrastructure.id}
          />
        ))}
        {nearby_neighbourhoods?.map((neighbourhood) => (
          <NeighbourhoodMarker
            neighbourhood={neighbourhood}
            key={neighbourhood.place_id}
          />
        ))}
        <OSMNeighbourhoodMarker />
        <InfrastructureInfoWindow />
        {/* <NeighbourhoodPolygon /> */}
        <Circles />
      </Map>
      <SideBar />
    </div>
  );
};

export default Home;

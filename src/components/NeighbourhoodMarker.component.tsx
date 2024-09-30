"use client";
import { Marker } from "@react-google-maps/api";
import React, { FC } from "react";
import home_icon from "@/images/icons8-home-48.png";
import { TGeocodingPlace } from "@/utils/types";
import { useMapContext } from "@/contexts/MapContext.context";

const NeighbourhoodMarker: FC<{ neighbourhood: TGeocodingPlace }> = ({
  neighbourhood,
}) => {
  const { setDisplayInfo, setInfrastructureInfo } = useMapContext();

  const handle_display_info = () => {
    setDisplayInfo(true);
    setInfrastructureInfo(neighbourhood);
      
  };

  return (
    <>
      <Marker
        position={{
          lat: neighbourhood.geometry.location.lat,
          lng: neighbourhood.geometry.location.lng,
        }}
        icon={home_icon.src}
        onClick={handle_display_info}
      />
    </>
  );
};

export default NeighbourhoodMarker;

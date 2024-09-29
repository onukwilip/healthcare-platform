"use client";
import { Marker } from "@react-google-maps/api";
import React, { FC } from "react";
import hospital_icon from "@/images/icons8-hospital-48.png";
import { TPlace } from "@/utils/types";
import { useMapContext } from "@/contexts/MapContext.context";

const HospitalMarker: FC<{ infrastructure: TPlace }> = ({ infrastructure }) => {
  const { setDisplayInfo, setInfrastructureInfo } = useMapContext();

  const handle_display_info = () => {
    setDisplayInfo(true);
    setInfrastructureInfo(infrastructure);
  };

  return (
    <>
      <Marker
        position={{
          lat: infrastructure.location.latitude,
          lng: infrastructure.location.longitude,
        }}
        icon={hospital_icon.src}
        onClick={handle_display_info}
      />
    </>
  );
};

export default HospitalMarker;

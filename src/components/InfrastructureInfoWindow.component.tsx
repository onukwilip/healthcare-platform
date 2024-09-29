"use client";
import { useMapContext } from "@/contexts/MapContext.context";
import { Button } from "@mui/material";
import { InfoWindow } from "@react-google-maps/api";
import React from "react";

const InfrastructureInfoWindow = () => {
  const {
    display_info,
    infrastructure_info,
    add_infrastructure,
    setDisplayInfo,
  } = useMapContext();

  return (
    <>
      {display_info && infrastructure_info && (
        <InfoWindow
          position={{
            lat: infrastructure_info?.location.latitude,
            lng: infrastructure_info?.location.longitude,
          }}
          onCloseClick={() => setDisplayInfo(false)}
        >
          <>
            <div className="flex flex-col w-full">
              <span className="font-bold">
                {infrastructure_info?.displayName.text}
              </span>
              <span className="block max-w-[300px] text-wrap">
                {infrastructure_info?.formattedAddress}
              </span>
            </div>
            <br />
            <Button
              variant="outlined"
              size="small"
              onClick={() => add_infrastructure(infrastructure_info)}
            >
              View details
            </Button>
          </>
        </InfoWindow>
      )}
    </>
  );
};

export default InfrastructureInfoWindow;

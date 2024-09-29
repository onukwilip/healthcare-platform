"use client";
import { useMapContext } from "@/contexts/MapContext.context";
import { TGeocodingPlace, TPlace } from "@/utils/types";
import { Button } from "@mui/material";
import { InfoWindow } from "@react-google-maps/api";
import React from "react";

const InfrastructureInfoWindow = () => {
  const {
    map_ref,
    display_info,
    infrastructure_info,
    add_infrastructure,
    setDisplayInfo,
  } = useMapContext();

  const position = {
    lat:
      (infrastructure_info as TPlace)?.location?.latitude ||
      (infrastructure_info as TGeocodingPlace)?.geometry?.location?.lat ||
      0,
    lng:
      (infrastructure_info as TPlace)?.location?.longitude ||
      (infrastructure_info as TGeocodingPlace)?.geometry?.location?.lng ||
      0,
  };

  const handle_click = () => {
    if (!infrastructure_info) return;

    add_infrastructure(infrastructure_info as TPlace);
    map_ref.current?.panTo(position);
    map_ref.current?.setZoom(18);
  };

  return (
    <>
      {display_info && infrastructure_info && (
        <InfoWindow
          position={position}
          onCloseClick={() => setDisplayInfo(false)}
        >
          <div className="flex flex-col gap-4 pb-4 pr-4">
            <div className="flex flex-col w-full">
              {(infrastructure_info as TPlace)?.displayName?.text && (
                <span className="font-bold">
                  {(infrastructure_info as TPlace)?.displayName?.text}
                </span>
              )}
              <span className="block max-w-[300px] text-wrap">
                {(infrastructure_info as TPlace)?.formattedAddress ||
                  (infrastructure_info as TGeocodingPlace)?.formatted_address}
              </span>
            </div>
            <Button variant="outlined" size="small" onClick={handle_click}>
              {(infrastructure_info as TGeocodingPlace)?.geometry
                ? "Get direction"
                : "View details"}
            </Button>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default InfrastructureInfoWindow;

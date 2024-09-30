import { useMapContext } from "@/contexts/MapContext.context";
import { TLatLng } from "@/utils/types";
import { Circle } from "@react-google-maps/api";
import React, { useEffect, useRef, useState } from "react";

const Circles = () => {
  const { display_circles } = useMapContext();
  const [location, setLocation] = useState<TLatLng>();

  const sm_circle_ref = useRef<Circle>(null);
  const md_circle_ref = useRef<Circle>(null);
  const lg_circle_ref = useRef<Circle>(null);

  useEffect(() => {
    if (display_circles)
      setLocation({
        lat: display_circles?.latitude || 0,
        lng: display_circles?.longitude || 0,
      });
    else {
      setLocation(undefined);
    }
  }, [display_circles]);

  return (
    <>
      {display_circles && (
        <>
          <Circle
            center={location}
            onCenterChanged={() => {}}
            radius={500}
            options={{
              strokeColor: "green",
              fillColor: "green",
              fillOpacity: 0.05,
            }}
            ref={sm_circle_ref}
          />
          <Circle
            center={location}
            radius={1000}
            options={{
              strokeColor: "yellow",
              fillColor: "yellow",
              fillOpacity: 0.05,
            }}
            ref={md_circle_ref}
          />
          <Circle
            center={location}
            radius={2000}
            options={{
              strokeColor: "orangered",
              fillColor: "orangered",
              fillOpacity: 0.05,
            }}
            ref={lg_circle_ref}
          />
        </>
      )}
    </>
  );
};

export default Circles;

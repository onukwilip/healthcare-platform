import { useMapContext } from "@/contexts/MapContext.context";
import { Circle } from "@react-google-maps/api";
import React, { useEffect, useRef } from "react";

const Circles = () => {
  const { display_circles } = useMapContext();
  const sm_circle_ref = useRef<Circle>(null);
  const md_circle_ref = useRef<Circle>(null);
  const lg_circle_ref = useRef<Circle>(null);

  useEffect(() => {
    // if (sm_circle_ref.current) (sm_circle_ref as any).current?.setMap(null);
  }, [display_circles]);

  return (
    <>
      {display_circles && (
        <>
          <Circle
            center={{
              lat: display_circles?.latitude || 0,
              lng: display_circles?.longitude || 0,
            }}
            onCenterChanged={() => {}}
            radius={500}
            options={{ strokeColor: "green", fillColor: "green", fillOpacity: 0.05 }}
            ref={sm_circle_ref}
          />
          <Circle
            center={{
              lat: display_circles?.latitude || 0,
              lng: display_circles?.longitude || 0,
            }}
            radius={1000}
            options={{ strokeColor: "yellow", fillColor: "yellow", fillOpacity: 0.05 }}
            ref={md_circle_ref}
          />
          <Circle
            center={{
              lat: display_circles?.latitude || 0,
              lng: display_circles?.longitude || 0,
            }}
            radius={2000}
            options={{ strokeColor: "orangered", fillColor: "orangered", fillOpacity: 0.05 }}
            ref={lg_circle_ref}
          />
        </>
      )}
    </>
  );
};

export default Circles;

"use cient";

import React, {
  forwardRef,
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import Loader from "./Loader.component";
import { useMapContext } from "@/contexts/MapContext.context";

const Map = forwardRef<any, { children?: ReactNode }>(
  ({ children }, reference) => {
    const map = useRef<google.maps.Map>();
    const { map_ref } = useMapContext();
    const center = useMemo(
      () => ({
        lat: 9.082,
        lng: 8.6753,
      }),
      []
    );
    const [zoom, setZoom] = useState(10);
    const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: "",
    });

    const onLoad = useCallback((mapObj: google.maps.Map) => {
      const bounds = new window.google.maps.LatLngBounds(center);
      mapObj.fitBounds(bounds);
      mapObj.setZoom(7)

      map.current = mapObj;
      map_ref.current = mapObj;
      
      if (reference)
        (reference as MutableRefObject<google.maps.Map>).current = mapObj;
    }, []);

    useEffect(() => {
      setZoom(7);
    }, []);

    if (!isLoaded)
      return (
        <>
          <Loader className="w-screen h-screen" />
        </>
      );

    return (
      <>
        <GoogleMap
          mapContainerStyle={{ width: "100vw", height: "100vh" }}
          // center={center}
          // zoom={zoom}
          onLoad={onLoad}
        >
          {children}
        </GoogleMap>
      </>
    );
  }
);

export default Map;

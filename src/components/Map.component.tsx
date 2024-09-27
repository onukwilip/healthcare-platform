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

const getGeocode = async (position: any) => {
  const geoCoder = new window.google.maps.Geocoder();
  const loc = position;
  const response = await geoCoder.geocode({ location: loc });
  console.log("Marker is long lat is:", loc);
  console.log("E is: ", position);
  console.log("Response is: ", response?.results);
  return response?.results[0]?.formatted_address;
};

const Map = forwardRef<any, { children?: ReactNode }>(
  ({ children }, reference) => {
    const map = useRef();
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

    const onLoad = useCallback((mapObj: any) => {
      const bounds = new window.google.maps.LatLngBounds(center);
      //   const zoom = new window.google.maps.zoom(center);
      mapObj.fitBounds(bounds);

      map.current = mapObj;
      if (reference)
        (reference as MutableRefObject<undefined>).current = mapObj;
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
          center={center}
          zoom={zoom}
          onLoad={onLoad}
        >
          {children}
        </GoogleMap>
      </>
    );
  }
);

export default Map;

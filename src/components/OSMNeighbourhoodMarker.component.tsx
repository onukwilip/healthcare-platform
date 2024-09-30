"use client";
import { useMapContext } from "@/contexts/MapContext.context";
import { Marker, MarkerClusterer } from "@react-google-maps/api";
import React from "react";
import home_icon from "@/images/icons8-home-48.png";

const OSMNeighbourhoodMarker = () => {
  const { osm_neighbourhoods } = useMapContext();

  return (
    <>
      {" "}
      {osm_neighbourhoods?.length > 0 && (
        <>
          <MarkerClusterer>
            {(cluster) => (
              <>
                {osm_neighbourhoods?.map(({ id, lat, lon: lng }) => (
                  <Marker
                    position={{ lat, lng }}
                    key={id}
                    clusterer={cluster}
                    icon={{
                      url: home_icon.src,
                      scale: 0.6
                    }}
                  />
                ))}
              </>
            )}
          </MarkerClusterer>
        </>
      )}
    </>
  );
};

export default OSMNeighbourhoodMarker;

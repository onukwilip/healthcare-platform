import React, { useEffect, useState } from "react";
import { TLatLng } from "@/utils/types";
import { Polygon } from "@react-google-maps/api";
import { useMapContext } from "@/contexts/MapContext.context";

const NeighbourhoodPolygon = () => {
  const [polygon_paths, setPolygonPaths] = useState<TLatLng[]>();
  const { neighbourhood_polygon } = useMapContext();

  const add_paths = () => {
    const finished_paths: TLatLng[] = [];

    if (!neighbourhood_polygon?.geometry?.geometries) return;

    for (const geometry of neighbourhood_polygon?.geometry?.geometries) {
      for (const coords of geometry?.coordinates) {
        const lat_lng: TLatLng = {
          lat: coords[0],
          lng: coords[1],
        };

        finished_paths.push(lat_lng);
      }
    }

    setPolygonPaths(finished_paths);
  };

  useEffect(() => {
    add_paths();

    if (!neighbourhood_polygon) setPolygonPaths(undefined);
  }, [neighbourhood_polygon]);

  console.log("Polygon paths...", polygon_paths);

  return (
    <>
      {polygon_paths && (
        <Polygon
          paths={polygon_paths}
          options={{
            fillColor: "#32a8c4",
            fillOpacity: 0.05,
            strokeColor: "#32a8c4",
            strokeOpacity: 1,
            strokeWeight: 2,
          }}
        />
      )}
    </>
  );
};

export default NeighbourhoodPolygon;

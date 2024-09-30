"use client";
import {
  TGeocodingPlace,
  TLatLng,
  TLocation,
  TNeighbourhoodPolygon,
  TOSMNeighbourhoods,
  TPlace,
} from "@/utils/types";
import Image from "next/image";
import React, { FC, useState } from "react";
import EachInfrastructureDetail from "./EachInfrastructureDetail.component";
import { Alert, Button, Rating, Snackbar } from "@mui/material";
import { useMapContext } from "@/contexts/MapContext.context";
import axios, { AxiosResponse } from "axios";
import { neighbourhoods } from "@/utils/data.json";

/**
 * * Function responsible for retrieving the nearby neighbourhoods around a public infrastructure
 * @param location The coordinates of the location to get nearby residential addresses, i.e. the lattitude and the longitude
 * @returns Neighbourhoods surrounding a place, e.g. hospital
 */
const get_nearby_neighbourhoods = async (
  location: TLocation
): Promise<TGeocodingPlace[] | undefined> => {
  try {
    // ! REMOVE
    return neighbourhoods.results;

    const response = await axios.get<
      any,
      AxiosResponse<{ results: TGeocodingPlace[] }>
    >(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&result_type=locality|neighborhood&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    );

    if (response.status !== 200) return undefined;

    return response.data?.results;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

/**
 * * Function responsible for retrieving the nearby neighbourhoods around a public infrastructure using the Open Street maps API
 * @param location The coordinates of the location to get nearby residential addresses, i.e. the lattitude and the longitude
 * @returns Neighbourhoods surrounding a place, e.g. hospital
 */
const get_osm_neighbourhoods = async (
  location: TLocation
): Promise<TOSMNeighbourhoods[] | undefined> => {
  try {
    console.log("OSM location", location);
    const query = `[out:json];
  (
    // Search for residential land use around a specific location
    node["landuse"="residential"](around:1000, ${location.latitude}, ${location.longitude});
    way["landuse"="residential"](around:1000, ${location.latitude}, ${location.longitude});
    relation["landuse"="residential"](around:500, ${location.latitude}, ${location.longitude});
  );
out body;
>;
out skel qt;
  `;
    const response = await axios.get<
      any,
      AxiosResponse<{ elements: TOSMNeighbourhoods[] }>
    >(
      `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
        query
      )}`
    );

    if (response.status !== 200) return;

    return response.data?.elements;
  } catch (error) {
    console.error(error);
    return;
  }
};

const InfrastructureData: FC<{ infrastructure: TPlace }> = ({
  infrastructure,
}) => {
  const [expand, setExpand] = useState(true);
  const [is_loading, setIsLoading] = useState(false);
  const [show_snackbar, setShowSnackbar] = useState(false);
  const {
    map_ref,
    setNearbyNeighbourhoods,
    setOSMNeighbourhoods,
    remove_infrastructure,
    setDisplayCircles,
    // setNeighbourhoodPolygon,
  } = useMapContext();

  const get_accessibility = async () => {
    // const neighbourhoods = await get_nearby_neighbourhoods(
    //   infrastructure.location
    // );
    console.log("My location", infrastructure.location);
    console.log(
      "My address",
      infrastructure.formattedAddress,
      infrastructure.displayName.text
    );

    setIsLoading(true);
    setShowSnackbar(false);

    const osm_neighbourhoods = await get_osm_neighbourhoods(
      infrastructure.location
    );

    if (!osm_neighbourhoods) {
      setShowSnackbar(true);
      return setIsLoading(false);
    }

    // console.log("Google Maps API NEIGHBOURHOODS", neighbourhoods);
    // setNearbyNeighbourhoods(neighbourhoods);
    // setOSMNeighbourhoods(
    //   osm_neighbourhoods.filter((each) => each.type === "node")
    // );
    // setNeighbourhoodPolygon(osm_neighbourhoods);

    console.log("OSM NEIGHBOURHOODS", osm_neighbourhoods);
    setOSMNeighbourhoods(osm_neighbourhoods);
    setDisplayCircles(infrastructure.location);
    map_ref.current?.panTo({
      lat: infrastructure.location.latitude,
      lng: infrastructure.location.longitude,
    });
    map_ref.current?.setZoom(16);
    setIsLoading(false);
    setShowSnackbar(false);
  };

  return (
    <>
      <div className="p-4 bg-primaryLight flex flex-col gap-4 rounded-md">
        <div className="flex w-full items-center justify-between gap-4">
          <div className="font-thin flex-1 text-sm">
            {infrastructure.displayName.text}
          </div>
          <div className="flex gap-2">
            <i
              className="fa-solid fa-trash-can text-red-400 cursor-pointer transition hover:scale-110"
              onClick={() => remove_infrastructure(infrastructure.id)}
            ></i>
            <i
              className={`fa-solid fa-caret-right cursor-pointer text-lg transition ${
                expand ? "rotate-90" : ""
              }`}
              onClick={() => setExpand((prev) => !prev)}
            ></i>
          </div>
        </div>
        {expand && (
          <div className="text-sm">
            {/* IMAGE CONTAINER */}
            {infrastructure.photos && (
              <>
                <div className="flex gap-2 overflow-y-hidden overflow-x-auto max-w-fit">
                  {infrastructure?.photos?.map((image) => (
                    <>
                      <Image
                        width={60}
                        height={60}
                        src={image?.authorAttributions?.[0]?.photoUri || ""}
                        alt={image.name}
                        className="rounded object-contain"
                      />
                    </>
                  ))}
                </div>
                <br />
              </>
            )}
            {/* RATINGS */}
            <EachInfrastructureDetail
              value={
                <div className="flex items-center gap-2">
                  <Rating
                    name="disabled"
                    value={infrastructure.rating}
                    readOnly
                    size="small"
                  />
                  <span className="text-lg">{infrastructure.rating}</span>
                </div>
              }
            />
            {/* ADDRESS */}
            <EachInfrastructureDetail
              title="Address"
              value={infrastructure.formattedAddress}
            />
            <br />
            {/* OPENED OR CLOSED */}
            <EachInfrastructureDetail
              value={
                infrastructure?.currentOpeningHours?.openNow ||
                infrastructure?.regularOpeningHours?.openNow ? (
                  <span className="text-green-600">Open</span>
                ) : (
                  <span className="text-red-400">Closed</span>
                )
              }
            />
            {infrastructure?.regularOpeningHours?.weekdayDescriptions?.map(
              (each, i) => (
                <EachInfrastructureDetail value={each} key={i} />
              )
            )}
            <br />
            {/* ACCESSIBILITY */}
            <div className="flex flex-wrap gap-2 w-full">
              {Object.keys(infrastructure.accessibilityOptions || {})?.map(
                (key, i) => (
                  <EachInfrastructureDetail
                    value={
                      <span
                        className="bg-green-600 text-xs w-fit p-1 px-2 text-white block rounded-full"
                        key={i}
                      >
                        {key}
                      </span>
                    }
                  />
                )
              )}
            </div>
            <br />
            {/* ACTIONS */}
            <div>
              {/* DISPLAY NEARBY PLACES */}
              <Button
                size="small"
                onClick={get_accessibility}
                disabled={is_loading}
              >
                View nearby neighbourhoods
              </Button>
            </div>
          </div>
        )}
      </div>
      {show_snackbar && (
        <Snackbar
          open={show_snackbar}
          autoHideDuration={6000}
          onClose={() => setShowSnackbar(false)}
        >
          <Alert color="warning" onClose={() => setShowSnackbar(false)}>
            There was an error retrieving nearby residential areas
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default InfrastructureData;

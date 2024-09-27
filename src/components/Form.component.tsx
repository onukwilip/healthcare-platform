"use client";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import React, { FormEventHandler,  useRef, useState } from "react";
import { states, coordinates, hospitals } from "@/utils/data.json";
import { THospital, useMapContext } from "@/contexts/MapContext.context";

/**
 * Returns a list of healthcare centres within a particular LGA/region
 * @param config The coordinates of the region where to retrieve healtthcare centres
 * @returns List of healthcare centres within a specific region
 */
const get_healthcares = async (config: { lat: number; lng: number }): Promise<THospital[] | undefined> => {
  try {
    // ! REMOVE
    return hospitals.places

    const req_body = {
      includedTypes: ["hospital"],
      locationRestriction: {
        circle: {
          center: {
            latitude: config.lat,
            longitude: config.lng,
          },
          radius: 3000.0,
        },
      },
    };

    const res = await axios.post(
      "https://places.googleapis.com/v1/places:searchNearby",
      req_body,
      {
        headers: {
          ["X-Goog-Api-Key" as any]: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
          ["X-Goog-FieldMask" as any]:
            "places.displayName,places.location",
        },
      }
    );

    if (res.status !== 200) {
      return undefined;
    }

    return res.data?.places;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

/**
 * Retrieves the coordinates of the LGA passed into it
 * @param address The address, e.g the LGA to retrieve it's coordinates
 * @returns The coordinates of the local government
 */
const get_coordinates = async (
  address: string
): Promise<{ lat: number; lng: number } | undefined> => {
  try {
    // ! REMOVE
    return coordinates.results?.[0]?.geometry?.location

    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&region=ng&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    );

    if (res.status !== 200) {
      return undefined;
    }

    return res.data?.results?.[0]?.geometry?.location;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const Form = () => {
  const form_ref = useRef<HTMLFormElement>(null);
  const [lgas, setLgas] = useState<string[]>();
  const [is_disabled, setIsDisabled] = useState(true);
  const {map_ref, setHospitals} = useMapContext()

  /**
   * Fills the local governments state with the list of LGA for the selected state
   * @param e The select field onchange event
   */
  const handle_state_change: (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode
  ) => void = (e) => {
    const state = states.find((state) => state.state === e.target.value);
    setLgas(state?.lgas);
  };

  /**
   * Enables the button to search/submit the form
   * @param e The select field onchange event
   */
  const handle_lga_change: (
    event: SelectChangeEvent<unknown>,
    child: React.ReactNode
  ) => void = (e) => {
    setIsDisabled(false);
  };

  /**
   * Retrieves the coordinates of the selected LGA and healthcare centers within the LGA
   * @param e The form submit event
   */
  const search_healthcares: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const state = form_ref.current?.["state"]?.value;
    const lga = form_ref.current?.["lga"]?.value;

    const coordinates = await get_coordinates(`${lga}, ${state}`);

    if (!coordinates)
      return console.error("An error occured while retrieving the Geo code");

    const hospitals = await get_healthcares(coordinates);

    if(!hospitals)
      return console.error("An error occured while retrieving the Hospitals");

    console.log("COORDINATES", coordinates);
    console.log("HOSPITALS", hospitals);

    map_ref.current?.panTo(coordinates)
    map_ref.current?.setZoom(15)
    setHospitals(hospitals)
  };

  return (
    <form
      ref={form_ref}
      onSubmit={search_healthcares}
      className="w-full h-fit mt-4 flex items-start justify-start gap-4 flex-col"
    >
      <span className="font-thin text-lg capitalize">
        Filter healthcare centres
      </span>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select state</InputLabel>
        <Select
          id="state"
          label="State"
          variant="filled"
          placeholder="Select State"
          className="w-full"
          size="small"
          name="state"
          required
          onChange={handle_state_change}
        >
          {states.map((each_state) => (
            <MenuItem value={each_state.state}>{each_state.state}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {lgas && (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select LGA</InputLabel>
          <Select
            id="lga"
            label="LGA"
            variant="filled"
            className="w-full"
            size="small"
            name="lga"
            required
            onChange={handle_lga_change}
          >
            {lgas.map((each_lga) => (
              <MenuItem value={each_lga}>{each_lga}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      <div className="w-full flex justify-end">
        <Button variant="outlined" type="submit" disabled={is_disabled}>
          Search
        </Button>
      </div>
    </form>
  );
};

export default Form;

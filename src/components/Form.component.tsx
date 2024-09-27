"use client";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import React, { FormEventHandler, useRef } from "react";

/**
 * Returns a list of healthcare centres within a particular LGA/region
 * @param config The coordinates of the region where to retrieve healtthcare centres
 * @returns List of healthcare centres within a specific region
 */
const get_healthcares = async (config: { lat: number; lng: number }) => {
  try {
    const req_body = {
      includedTypes: ["healthcare"],
      locationRestriction: {
        circle: {
          center: {
            latitude: config.lat,
            longitude: config.lng,
          },
          radius: 1000.0,
        },
      },
    };

    const res = await axios.post(
      "https://places.googleapis.com/v1/places:searchNearby",
      req_body,
      {
        ["X-Goog-Api-Key" as any]: process.env.GOOGLE_API_KEY,
        ["X-Goog-FieldMask" as any]:
          "places.displayName,places.formattedAddress,places.types,places.websiteUri",
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
const get_coordinates = async (address: string) => {
  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&region=ng&key=${process.env.GOOGLE_API_KEY}`
    );

    if (res.status !== 200) {
      return undefined;
    }

    return res.data?.results;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const Form = () => {
  const formRef = useRef<HTMLFormElement>(null);

  /**
   * Retrieves the coordinates of the selected LGA and healthcare centers within the LGA
   * @param e The form submit event
   */
  const search_healthcares: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const state = formRef.current?.["state"]?.value;
    const lga = formRef.current?.["lga"]?.value;

    const coordinates = await get_coordinates(`${lga}, ${state}`);

    console.log("COORDINATES", coordinates);
  };

  return (
    <form
      ref={formRef}
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
        >
          <MenuItem value={10}>Lagos</MenuItem>
          <MenuItem value={20}>Abuja</MenuItem>
          <MenuItem value={30}>Anambra</MenuItem>
        </Select>
      </FormControl>
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
        >
          <MenuItem value={10}>Onitsha South</MenuItem>
          <MenuItem value={20}>Onitsha North</MenuItem>
          <MenuItem value={30}>Awka South</MenuItem>
        </Select>
      </FormControl>
      <div className="w-full flex justify-end">
        <Button variant="outlined" type="submit">
          Search
        </Button>
      </div>
    </form>
  );
};

export default Form;

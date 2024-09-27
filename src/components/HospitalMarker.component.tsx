import { THospital } from "@/contexts/MapContext.context";
import { Marker } from "@react-google-maps/api";
import React, { FC } from "react";
import hospital_icon from '@/images/icons8-hospital-48.png'

const HospitalMarker: FC<{ hospital: THospital }> = ({ hospital }) => {
  return (
    <Marker
      position={{
        lat: hospital.location.latitude,
        lng: hospital.location.longitude,
          }}
          icon={hospital_icon.src}
    />
  );
};

export default HospitalMarker;

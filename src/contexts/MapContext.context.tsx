"use client";
import {
  createContext,
  Dispatch,
  FC,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";

export type THospital = {
  location: {
    latitude: number;
    longitude: number;
  };
  displayName: {
    text: string;
    languageCode: string;
  };
}

const MapContext = createContext<{
  map_ref: MutableRefObject<google.maps.Map | null>;
  hospitals:
    | THospital[]
  | undefined;
  setHospitals: Dispatch<SetStateAction<THospital[] | undefined>>
}>({
  map_ref: { current: null },
  hospitals: undefined,
  setHospitals: ()=>{}
});

export const MapContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const map_ref = useRef<google.maps.Map>(null);
  const [hospitals, setHospitals] = useState<THospital[]>();

  return (
    <MapContext.Provider value={{ map_ref, hospitals, setHospitals }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);

  if (!context)
    throw new Error("Content must be wrapped inside the MapContextProvider");

  return context;
};

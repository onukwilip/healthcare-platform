"use client";
import { TPlace } from "@/utils/types";
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

const MapContext = createContext<{
  map_ref: MutableRefObject<google.maps.Map | null>;
  infrastructures: TPlace[] | undefined;
  setInfrastructures: Dispatch<SetStateAction<TPlace[] | undefined>>;
  display_info: boolean;
  setDisplayInfo: Dispatch<SetStateAction<boolean>>;
  infrastructure_info: TPlace | undefined;
  setInfrastructureInfo: Dispatch<SetStateAction<TPlace | undefined>>;
  infrastructure_details_list: TPlace[];
  setInfrastructureDetailsList: Dispatch<SetStateAction<TPlace[]>>;
  add_infrastructure: (infrastructure: TPlace) => void;
  remove_infrastructure: (id: string) => void;
}>({
  map_ref: { current: null },
  infrastructures: undefined,
  setInfrastructures: () => {},
  display_info: false,
  setDisplayInfo: () => {},
  infrastructure_info: undefined,
  setInfrastructureInfo: () => {},
  infrastructure_details_list: [],
  setInfrastructureDetailsList: () => {},
  add_infrastructure: () => {},
  remove_infrastructure: () => {},
});

export const MapContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const map_ref = useRef<google.maps.Map>(null);
  const [infrastructures, setInfrastructures] = useState<TPlace[]>();
  const [display_info, setDisplayInfo] = useState(false);
  const [infrastructure_info, setInfrastructureInfo] = useState<TPlace>();
  const [infrastructure_details_list, setInfrastructureDetailsList] = useState<
    TPlace[]
  >([]);

  const add_infrastructure = (infrastructure: TPlace) => {
    const infrastructure_exists = infrastructure_details_list.find(
      (inf) => inf.id === infrastructure.id
    );
    if (infrastructure_exists) return;
    setInfrastructureDetailsList((prev_infrastructures) => [
      ...prev_infrastructures,
      infrastructure,
    ]);
  };

  const remove_infrastructure = (id: string) => {
    setInfrastructureDetailsList((prev_infrastructures) =>
      prev_infrastructures.filter((each) => each.id !== id)
    );
  };

  return (
    <MapContext.Provider
      value={{
        map_ref,
        infrastructures,
        setInfrastructures,
        display_info,
        setDisplayInfo,
        infrastructure_info,
        setInfrastructureInfo,
        infrastructure_details_list,
        setInfrastructureDetailsList,
        add_infrastructure,
        remove_infrastructure
      }}
    >
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

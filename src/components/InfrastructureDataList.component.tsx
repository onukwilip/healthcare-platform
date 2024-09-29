"use client"
import { useMapContext } from "@/contexts/MapContext.context";
import React, { FC } from "react";
import InfrastructureData from "./InfrastructureData.component";

const InfrastructureDataList: FC<{ data?: Record<any, any> }> = ({ data }) => {
  const { infrastructure_details_list } = useMapContext();

  return (
    <div className="w-full flex flex-col gap-4">
      {infrastructure_details_list.length > 0 ? (
        <>
          {infrastructure_details_list.map((infrastructure) => (
            <>
              <InfrastructureData
                infrastructure={infrastructure}
                key={infrastructure.id}
              />
            </>
          ))}
        </>
      ) : (
        <>
          <div className="w-full h-[200px] flex items-center justify-center rounded-lg bg-red-300 text-white">
            <span>No infrastructure selected</span>
          </div>
        </>
      )}
    </div>
  );
};

export default InfrastructureDataList;

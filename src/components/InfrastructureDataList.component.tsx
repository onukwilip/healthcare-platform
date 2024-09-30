"use client";
import { useMapContext } from "@/contexts/MapContext.context";
import React, { FC } from "react";
import InfrastructureData from "./InfrastructureData.component";
import error404img from "@/images/404error.png";
import Image from "next/image";

const InfrastructureDataList: FC = () => {
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
          <div className="w-full flex items-center flex-col justify-center text-primary">
            <Image
              width={200}
              height={200}
              src={error404img.src}
              alt={"404 error"}
              />
              <span>No healthcare centre selected</span>
          </div>
        </>
      )}
    </div>
  );
};

export default InfrastructureDataList;

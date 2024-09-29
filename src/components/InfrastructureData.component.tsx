"use client";
import { TPlace } from "@/utils/types";
import Image from "next/image";
import React, { FC, useState } from "react";
import EachInfrastructureDetail from "./EachInfrastructureDetail.component";

const InfrastructureData: FC<{ infrastructure: TPlace }> = ({
  infrastructure,
}) => {
  const [expand, setExpand] = useState(true);

  return (
    <div className="p-4 bg-primaryLight flex flex-col gap-4 rounded-md">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="font-thin flex-1 text-sm">
          {infrastructure.displayName.text}
        </div>
        <div className="flex gap-2">
          <i className="fa-solid fa-trash-can text-red-400 cursor-pointer"></i>
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
          <div className="flex gap-2">
            {infrastructure?.photos?.map((image) => (
              <>
                <Image
                  width={100}
                  height={100}
                  src={image?.authorAttributions?.[0]?.photoUri || ""}
                  alt={image.name}
                  className="rounded object-contain"
                />
              </>
            ))}
          </div>
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
        </div>
      )}
    </div>
  );
};

export default InfrastructureData;

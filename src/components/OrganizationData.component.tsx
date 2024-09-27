import React, { FC } from "react";

const OrganizationData: FC<{ data?: Record<any, any> }> = ({ data }) => {
  return (
    <div className="w-full">
      {data ? (
        <></>
      ) : (
        <>
          <div className="w-full h-[200px] flex items-center justify-center rounded-lg bg-red-300 text-white">
            <span>No healthcare selected</span>
          </div>
        </>
      )}
    </div>
  );
};

export default OrganizationData;

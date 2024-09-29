import React, { FC, ReactNode } from "react";

const EachInfrastructureDetail: FC<{ title?: string; value: ReactNode }> = ({
  title,
  value,
}) => {
  return (
    <div className="w-full flex flex-col">
     {title && <span className="font-bold">{title}</span>}
      <span>{value}</span>
    </div>
  );
};

export default EachInfrastructureDetail;

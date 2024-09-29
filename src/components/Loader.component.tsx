import React, { CSSProperties, FC, HTMLAttributes } from "react";
import HashLoader from "react-spinners/HashLoader";

const override: CSSProperties = {
  display: "block",
  //   margin: "0 auto",
};

const Loader: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={`w-full h-full flex items-center justify-center ${className}`}
    >
      <HashLoader
        color={"#32a8c4"}
        loading={true}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;

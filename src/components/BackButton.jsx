import React from "react";
import { Link } from "react-router-dom";

const BackButton = ({children}) => {
  return (
    <Link className=" text-xl leading-1.5 tracking-wider ml-4" to="/">
      {children}
    </Link>
  );
};

export default BackButton;

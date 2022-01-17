import React from "react";
import { IoMdRocket as Rocket } from "react-icons/io";

export default function Loading() {
  return (
    <div className="loading">
      <Rocket className="rocket-loading" />
      <h4>Loading...</h4>
    </div>
  );
}

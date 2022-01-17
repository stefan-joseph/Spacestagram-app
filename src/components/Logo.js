import React from "react";
import { IoPlanetOutline as Planet } from "react-icons/io5";
import Background from "../images/insta_background.jpeg";

export default function Logo({ onChangeFeed }) {
  return (
    <div className="spacestagram-logo" onClick={() => onChangeFeed("today")}>
      <img src={Background}></img>
      <Planet className="planet" />
    </div>
  );
}

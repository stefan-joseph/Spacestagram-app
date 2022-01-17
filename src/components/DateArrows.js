import React from "react";
import moment from "moment";
import { AiOutlineDoubleLeft as DoubleLeft } from "react-icons/ai";
import { AiOutlineDoubleRight as DoubleRight } from "react-icons/ai";
import { AiOutlineLeft as Left } from "react-icons/ai";
import { AiOutlineRight as Right } from "react-icons/ai";

export default function DateArrows({ dateHeader, type, onMonthChange }) {
  const date = new Date();
  if (type === "nextMonth") {
    if (moment(dateHeader).add(1, "M").isBefore(date)) {
      return (
        <Right
          onClick={() => onMonthChange("nextMonth")}
          className="calendar-arrows"
        />
      );
    } else {
      return <Right className="calendar-arrows-inactive" />;
    }
  }
  if (type === "nextYear") {
    if (moment(dateHeader).add(1, "Y").isBefore(date)) {
      return (
        <DoubleRight
          onClick={() => onMonthChange(type)}
          className="calendar-arrows"
        />
      );
    } else {
      return <DoubleRight className="calendar-arrows-inactive" />;
    }
  }
  if (type === "preMonth") {
    if (moment(dateHeader).subtract(1, "M").isAfter("June 1995")) {
      return (
        <Left onClick={() => onMonthChange(type)} className="calendar-arrows" />
      );
    } else {
      return <Left className="calendar-arrows-inactive" />;
    }
  }
  if (type === "preYear") {
    if (moment(dateHeader).subtract(1, "Y").isAfter("June 1995")) {
      return (
        <DoubleLeft
          onClick={() => onMonthChange(type)}
          className="calendar-arrows"
        />
      );
    } else {
      return <DoubleLeft className="calendar-arrows-inactive" />;
    }
  }
}

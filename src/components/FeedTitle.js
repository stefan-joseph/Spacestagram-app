import React, { useState } from "react";
import "react-calendar/dist/Calendar.css";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import DateArrows from "./DateArrows";
import CalendarSelector from "./CalendarSelector";

export default function FeedTitle({
  feed,
  dateHeader,
  onMonthSelection,
  onMonthChange,
}) {
  return (
    <div className="feed-header">
      {feed === "today" && <h3>Today's Photo</h3>}
      {feed === "random" && <h3>10 Random Selections</h3>}
      {feed === "likes" && <h3>Liked Photos</h3>}
      {feed === "monthly" && (
        <>
          <DateArrows
            dateHeader={dateHeader}
            type="preYear"
            onMonthChange={onMonthChange}
          />
          <DateArrows
            dateHeader={dateHeader}
            type="preMonth"
            onMonthChange={onMonthChange}
          />
          <CalendarSelector
            dateHeader={dateHeader}
            onMonthSelection={onMonthSelection}
          />
          <DateArrows
            dateHeader={dateHeader}
            type="nextMonth"
            onMonthChange={onMonthChange}
          />
          <DateArrows
            dateHeader={dateHeader}
            type="nextYear"
            onMonthChange={onMonthChange}
          />
        </>
      )}
    </div>
  );
}

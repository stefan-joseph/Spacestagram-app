import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";

export default function CalendarSelector({ onMonthSelection, dateHeader }) {
  const [open, openCalendar] = useState(false);

  return (
    <Tooltip
      open={open}
      onRequestClose={() => openCalendar(false)}
      arrow="true"
      interactive="true"
      theme="light"
      size="small"
      position="bottom-start"
      html={
        <div>
          <Calendar
            onChange={(value) => {
              onMonthSelection(value);
              openCalendar(false);
            }}
            defaultView="year"
            maxDetail="year"
            minDetail="decade"
            returnValue="range"
            maxDate={new Date()}
            minDate={new Date("1995-07-02")}
            defaultActiveStartDate={new Date(dateHeader)}
          />
        </div>
      }
    >
      <h3 className="calendar-button" onClick={() => openCalendar(true)}>
        {dateHeader}
      </h3>
    </Tooltip>
  );
}

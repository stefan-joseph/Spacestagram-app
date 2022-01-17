import React, { Component } from "react";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import { IoSparkles as Stars } from "react-icons/io5";
import { IoSparklesOutline as StarsEmpty } from "react-icons/io5";
import { IoCalendar as Calendar } from "react-icons/io5";
import { IoCalendarOutline as CalendarEmpty } from "react-icons/io5";
import { IoHeart as Heart } from "react-icons/io5";
import { IoHeartOutline as HeartEmpty } from "react-icons/io5";
import { IoRocket as Rocket } from "react-icons/io5";
import { IoRocketOutline as RocketEmpty } from "react-icons/io5";
import Logo from "./Logo";

export default class NavBar extends Component {
  render() {
    const { onChangeFeed, selectedFeed } = this.props;
    return (
      <div className="header-toolbar">
        <div className="logo">
          <Logo onChangeFeed={onChangeFeed} />
          <h1 className="title" onClick={() => onChangeFeed("today")}>
            Space<span className="title-cursive">stagram</span>
          </h1>
        </div>
        <div className="header-feed-icons">
          <Tooltip title="Today's Photo" arrow={true} delay="500" size="small">
            <span onClick={() => onChangeFeed("today")}>
              {selectedFeed === "today" ? <Rocket /> : <RocketEmpty />}
            </span>
          </Tooltip>
          <Tooltip title="Monthly" arrow={true} delay="500" size="small">
            <span onClick={() => onChangeFeed("monthly")}>
              {selectedFeed === "monthly" ? <Calendar /> : <CalendarEmpty />}
            </span>
          </Tooltip>
          <Tooltip title="Random" arrow={true} delay="500" size="small">
            <span onClick={() => onChangeFeed("random")}>
              {selectedFeed === "random" ? <Stars /> : <StarsEmpty />}
            </span>
          </Tooltip>
          <Tooltip title="Likes" arrow={true} delay="500" size="small">
            <span onClick={() => onChangeFeed("likes")}>
              {selectedFeed === "likes" ? <Heart /> : <HeartEmpty />}
            </span>
          </Tooltip>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import uuid from "react-uuid";
import FeedTitle from "./FeedTitle";
import FeedItem from "./FeedItem";
import Loading from "./Loading";

export default class Feed extends Component {
  state = {
    data: [],
    loading: true,
    error: false,
    user: "infinity_and_beyond",
    likes: [],
    comments: [],
    startDate: moment(new Date()).startOf("month").format("YYYY-MM-DD"),
    endDate: moment(new Date()).format("YYYY-MM-DD"),
    dateHeader: moment(new Date()).format("MMMM YYYY"),
  };

  getData = () => {
    this.setState({ loading: true, error: false });
    {
      this.props.feed === "today" &&
        axios
          .get(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`
          )
          .then((response) => {
            if (this.props.feed === "today") {
              let array = [];
              array.push(response.data);
              this.setState({ data: array, loading: false });
            }
          })
          .catch((error) => {
            console.log(error);
            this.setState({ error: true, loading: false });
          });
    }
    {
      this.props.feed === "random" &&
        axios
          .get(
            `https://api.nasa.gov/planetary/apod?count=10&api_key=${process.env.REACT_APP_NASA_API_KEY}`
          )
          .then((response) => {
            if (this.props.feed === "random") {
              this.setState({ data: response.data, loading: false });
            }
          })
          .catch((error) => {
            console.log(error);
            this.setState({ error: true, loading: false });
          });
    }
    {
      this.props.feed === "monthly" &&
        axios
          .get(
            `https://api.nasa.gov/planetary/apod?start_date=${this.state.startDate}&end_date=${this.state.endDate}&api_key=${process.env.REACT_APP_NASA_API_KEY}`
          )
          .then((response) => {
            if (this.props.feed === "monthly") {
              this.setState({ data: response.data, loading: false });
            }
          })
          .catch((error) => {
            console.log(error);
            this.setState({ error: true, loading: false });
          });
    }

    {
      this.props.feed === "likes" &&
        this.setState({ data: this.state.likes, loading: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps !== this.props ||
      prevState.startDate !== this.state.startDate
    ) {
      this.getData();
    }
  }

  componentDidMount() {
    const likes = JSON.parse(localStorage.getItem("likes"));
    const comments = JSON.parse(localStorage.getItem("comments"));
    const startDate = localStorage.getItem("startDate");
    const endDate = localStorage.getItem("endDate");
    const dateHeader = localStorage.getItem("dateHeader");
    this.setState({ likes, comments, startDate, endDate, dateHeader });
    this.getData();
  }

  handleLike = (item) => {
    let likes = "";
    if (this.verifyLike(item)) {
      likes = this.state.likes.filter((like) => like.url !== item.url);
    } else {
      likes = [...this.state.likes, item];
    }
    this.setState({ likes });
    localStorage.setItem("likes", JSON.stringify(likes));
  };

  verifyLike = (item) => {
    if (this.state.likes.length > 0) {
      const liked = this.state.likes.find((like) => like.url === item.url);
      if (liked) return true;
      return false;
    }
  };

  handlePostComment = (url, comment) => {
    const commentObject = {
      user: this.state.user,
      post: url,
      id: uuid(),
      comment: comment,
    };
    const comments = [...this.state.comments, commentObject];
    this.setState({ comments });
    localStorage.setItem("comments", JSON.stringify(comments));
  };

  verifyComments = (post) => {
    const comments = this.state.comments.filter(
      (comment) => comment.post === post
    );
    return comments;
  };

  handleDeleteComment = (id) => {
    const comments = this.state.comments.filter((comment) => comment.id !== id);
    this.setState({ comments });
    localStorage.setItem("comments", JSON.stringify(comments));
  };

  formatDate = (date) => {
    const month = Intl.DateTimeFormat("en", { month: "long" }).format(
      new Date(date.slice(5, 7))
    );

    let day = date.slice(8);
    if (day[0] === "0") {
      day = day.slice(1);
    }

    return `${month} ${day}, ${date.slice(0, 4)}`;
  };

  formatExplanation = (text) => {
    if (text.length > 300) {
      text = `${text.slice(0, 300)}...`;
    }

    return text;
  };

  handleMonthSelection = (dateRange) => {
    console.log(dateRange);

    const startDate = moment(dateRange[0]).format("YYYY-MM-DD");
    console.log(startDate);

    const endDate = moment(dateRange[1]).format("YYYY-MM-DD");
    console.log(endDate);

    const dateHeader = moment(dateRange[0]).format("MMMM YYYY");
    console.log(dateHeader);

    this.setState({ startDate, endDate, dateHeader });
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
    localStorage.setItem("dateHeader", dateHeader);
  };

  handleMonthChange = (instruction) => {
    console.log(instruction);
    let startDate = null;
    let endDate = null;
    if (instruction === "nextMonth") {
      startDate = moment(this.state.startDate).add(1, "M").format("YYYY-MM-DD");
      endDate = moment(startDate).endOf("month").format("YYYY-MM-DD");
      if (moment(new Date()).isBefore(endDate))
        endDate = moment(new Date()).format("YYYY-MM-DD");
    }
    if (instruction === "preMonth") {
      startDate = moment(this.state.startDate)
        .subtract(1, "M")
        .format("YYYY-MM-DD");
      endDate = moment(startDate).endOf("month").format("YYYY-MM-DD");
    }
    if (instruction === "nextYear") {
      startDate = moment(this.state.startDate).add(1, "Y").format("YYYY-MM-DD");
      endDate = moment(startDate).endOf("month").format("YYYY-MM-DD");
      if (moment(new Date()).isBefore(endDate))
        endDate = moment(new Date()).format("YYYY-MM-DD");
    }
    if (instruction === "preYear") {
      startDate = moment(this.state.startDate)
        .subtract(1, "Y")
        .format("YYYY-MM-DD");
      endDate = moment(startDate).endOf("month").format("YYYY-MM-DD");
    }
    const dateHeader = moment(startDate).format("MMMM YYYY");
    this.setState({
      startDate,
      endDate,
      dateHeader,
    });
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
    localStorage.setItem("dateHeader", dateHeader);
  };

  render() {
    const { data, dateHeader, loading, error } = this.state;
    const { feed } = this.props;

    const loadedFeed = data.map((item) => (
      <FeedItem
        key={item.date}
        data={item}
        liked={this.verifyLike(item)}
        comments={this.verifyComments(item.url)}
        formattedExplanation={this.formatExplanation(item.explanation)}
        formattedDate={this.formatDate(item.date)}
        onLike={() => this.handleLike(item)}
        onPostComment={(url, comment) => this.handlePostComment(url, comment)}
        onDeleteComment={this.handleDeleteComment}
      />
    ));

    return (
      <div className="feed">
        <FeedTitle
          feed={feed}
          dateHeader={dateHeader}
          onMonthSelection={this.handleMonthSelection}
          onMonthChange={this.handleMonthChange}
        />
        {loading && <Loading />}
        {!error && !loading && loadedFeed}
        {feed === "likes" && data.length === 0 ? (
          <h5 className="no-likes to-bottom">
            You haven't liked anything.
            <br /> There are lots of things to like.
            <br /> Not just in this app, but in life too.
            <br /> Like coffee.
            <br /> Go out there and like some stuff.
          </h5>
        ) : null}
        {error && (
          <h5 className="to-bottom">
            Sorry, there was a problem retrieving the data. Please try again.
          </h5>
        )}
      </div>
    );
  }
}

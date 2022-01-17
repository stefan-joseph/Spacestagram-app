import { useState } from "react";
import ShareToolbar from "./ShareToolbar";
import ReactPlayer from "react-player/lazy";
import { FaHeart as HeartFilled } from "react-icons/fa";
import { FaRegHeart as HeartEmpty } from "react-icons/fa";
import { IoTrashOutline as Delete } from "react-icons/io5";
import Logo from "../images/nasa-logo.png";

function FeedItem(props) {
  const { explanation, hdurl, title, url, media_type } = props.data;
  const {
    comments,
    liked,
    onLike,
    formattedDate,
    formattedExplanation,
    onPostComment,
    onDeleteComment,
  } = props;

  const [expanded, expand] = useState(false);

  const [comment, updateComment] = useState("");

  return (
    <div className="feed-item">
      <div className="feed-item-header">
        <a href="https://api.nasa.gov/">
          <div className="avatar">
            <img src={Logo} />
          </div>
        </a>
        <a href="https://api.nasa.gov/" className="link-hover">
          <h5>NASA Astronomy Picture of the Day</h5>
        </a>
      </div>
      {media_type === "image" && <img src={hdurl} alt={title} />}
      {media_type === "video" && (
        <ReactPlayer url={url} width="500px" height="280px" controls={true} />
      )}
      <div className="feed-item-text">
        <div className="feed-item-toolbar">
          <span onClick={() => onLike()}>
            {liked ? (
              <HeartFilled className="heart-liked" />
            ) : (
              <HeartEmpty className="heart-unliked" />
            )}
          </span>
          <ShareToolbar url={url} />
          {liked && <p className="like-text">1 like</p>}
        </div>
        <h3>{title}</h3>
        <p className="feed-item-explanation">
          {expanded ? explanation : formattedExplanation}
          {expanded ? null : <span onClick={() => expand(true)}> more</span>}
        </p>
        {comments &&
          comments.map((comment) => {
            return (
              <div key={comment.id} className="feed-item-comment-container">
                <p className="feed-item-comment">
                  <span className="comment-user">{comment.user}</span>
                  {comment.comment}
                </p>
                <div
                  className="delete-comment"
                  onClick={() => onDeleteComment(comment.id)}
                >
                  <Delete />
                </div>
              </div>
            );
          })}
        <p className="feed-item-date">{formattedDate}</p>
      </div>
      <div className="feed-item-comment-input">
        <input
          value={comment}
          onChange={(e) => updateComment(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onPostComment(url, comment)}
          placeholder="Add a comment... "
          size="50"
        ></input>
        {comment.length > 0 ? (
          <h5
            onClick={() => {
              onPostComment(url, comment);
              updateComment("");
            }}
            className="post-active"
          >
            Post
          </h5>
        ) : (
          <h5 className="post-inactive">Post</h5>
        )}
      </div>
    </div>
  );
}

export default FeedItem;

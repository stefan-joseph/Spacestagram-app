import { useState } from "react";
import { Tooltip } from "react-tippy";
import "react-tippy/dist/tippy.css";
import { FiShare as Share } from "react-icons/fi";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  PinterestShareButton,
  PinterestIcon,
  TumblrShareButton,
  TumblrIcon,
  RedditShareButton,
  RedditIcon,
} from "react-share";

export default function ShareToolbar({ url }) {
  const [open, showShareTool] = useState(false);
  return (
    <Tooltip
      open={open}
      onRequestClose={() => showShareTool(false)}
      arrow="true"
      interactive
      theme="light"
      position="top-start"
      inertia="true"
      size="small"
      tag="span"
      html={
        <div className="share-toolbar">
          <FacebookShareButton url={url} onClick={() => showShareTool(false)}>
            <FacebookIcon round={true} size={28} />
          </FacebookShareButton>
          <TwitterShareButton url={url} onClick={() => showShareTool(false)}>
            <TwitterIcon round={true} size={28} />
          </TwitterShareButton>
          <WhatsappShareButton url={url} onClick={() => showShareTool(false)}>
            <WhatsappIcon round={true} size={28} />
          </WhatsappShareButton>
          <PinterestShareButton
            url={url}
            onClick={() => showShareTool(false)}
            media={url}
          >
            <PinterestIcon round={true} size={28} />
          </PinterestShareButton>
          <TumblrShareButton url={url} onClick={() => showShareTool(false)}>
            <TumblrIcon round={true} size={28} />
          </TumblrShareButton>
          <RedditShareButton url={url} onClick={() => showShareTool(false)}>
            <RedditIcon round={true} size={28} />
          </RedditShareButton>
        </div>
      }
    >
      <Share className="icon-click" onClick={() => showShareTool(true)} />
    </Tooltip>
  );
}

import React from "react";
import queryString from "query-string";

const ShareButton = ({ speed }) => {
  const handleShare = () => {
    const url = `${window.location.origin}${
      window.location.pathname
    }?${queryString.stringify({ speed })}`;
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  return <button onClick={handleShare}>Share</button>;
};

export default ShareButton;

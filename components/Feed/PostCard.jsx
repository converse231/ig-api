import Image from "next/image";
import React from "react";

function PostCard({ caption, photo }) {
  return (
    <Image
      src={photo}
      alt="photo"
      width={200}
      height={200}
      style={{
        objectFit: "contain", // cover, contain, none
      }}
    />
  );
}

export default PostCard;

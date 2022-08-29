import React from "react";
import RelatedVideoListItem from "./RelatedVideoListItem";

const RelatedVideoList = () => {
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      <RelatedVideoListItem />
    </div>
  );
};

export default RelatedVideoList;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { fetchRelatedVideos } from "../../features/relatedVideos/relatedVideosSlice";
import Loading from "../ui/Loading";
import RelatedVideoListItem from "./RelatedVideoListItem";

const RelatedVideoList = ({ tags, currentVideoId }) => {
  const dispatch = useDispatch();
  const { relatedVideos, isLoading, isError, error } = useSelector(
    (state) => state.relatedVideos
  );

  useEffect(() => {
    dispatch(fetchRelatedVideos({ tags, currentVideoId }));
  }, [dispatch, tags, currentVideoId]);

  // decide what to render
  let content;

  if (isLoading) content = <Loading />;

  if (!isLoading && isError)
    content = <div className="col-span-12">{error}</div>;

  if (!isError && !isLoading && relatedVideos?.length === 0) {
    content = <div className="col-span-12">No related videos found!</div>;
  }

  if (!isError && !isLoading && relatedVideos?.length > 0) {
    content = relatedVideos.map((relatedVideo) => (
      <RelatedVideoListItem key={relatedVideo.id} relatedVideo={relatedVideo} />
    ));
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
};

export default RelatedVideoList;

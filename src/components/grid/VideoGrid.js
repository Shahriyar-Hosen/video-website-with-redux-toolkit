import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../features/videos/videosSlice";
import Loading from "../ui/Loading";
import VideoGridItem from "./VideoGridItem";

const VideoGrid = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.videos);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  const { videos, isLoading, isError, error } = store;

  let content;

  // Loading
  isLoading && <Loading />;
  // error
  if (!isLoading && isError) {
    return (content = <div className="col-span-12">{error}</div>);
  }
  // No video found!
  if (!isLoading && !isError && videos?.length === 0) {
    return (content = <div className="col-span-12">No video found!</div>);
  }
  // All videos show!
  if (!isLoading && !isError && videos?.length > 0) {
    return (content = videos.map((video) => (
      <VideoGridItem key={video.ik} video={video} />
    )));
  }

  return (
    <section className="pt-12">
      <section className="pt-12">
        <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
          {content}

          {/* <div className="col-span-12">some error happened</div> */}
        </div>
      </section>
    </section>
  );
};

export default VideoGrid;

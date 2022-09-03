import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../features/videos/videosSlice";
import Loading from "../ui/Loading";
import VideoGridItem from "./VideoGridItem";

const VideoGrid = () => {
  const dispatch = useDispatch();
  const { videos: initVideo, paginate } = useSelector((state) => state);
  const { tags, search, author } = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(fetchVideos({ tags, search, author }));
  }, [dispatch, tags, search, author]);

  const { videos, isLoading, isError, error } = initVideo;

  const { pageSize, pageNumber } = paginate;

  // paginate
  const pagination = (array, page_size, page_number) => {
    const data = array.slice(
      (page_number - 1) * page_size,
      page_number * page_size
    );
    return data;
  };

  // decide what to render
  let content;

  if (isLoading) content = <Loading />;

  if (!isLoading && isError)
    content = <div className="col-span-12">{error}</div>;

  if (!isError && !isLoading && videos?.length === 0) {
    content = <div className="col-span-12">No videos found!</div>;
  }

  if (!isError && !isLoading && videos?.length > 0) {
    content = pagination(videos, pageSize, pageNumber).map((video) => (
      <VideoGridItem key={video.id} video={video} />
    ));
  }

  return (
    <section className="pt-12">
      <section className="pt-12">
        <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
          {content}
        </div>
      </section>
    </section>
  );
};

export default VideoGrid;

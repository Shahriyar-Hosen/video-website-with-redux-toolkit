import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authored } from "../../features/filter/filterSlice";

const RelatedVideoListItem = ({ relatedVideo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, title, thumbnail, duration, author, views, date } =
    relatedVideo || {};

  const authorFilter = (author) => {
    navigate("/");
    dispatch(authored(author));
  };

  return (
    <div className="w-full flex flex-row gap-2 mb-4">
      <div className="relative w-[168px] h-[94px] flex-none duration-300 hover:scale-[1.03]">
        <Link to={`/videos/${id}`}>
          <img src={thumbnail} className="object-cover" alt={title} />
        </Link>
        <p className="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py">
          {duration}
        </p>
      </div>

      <div className="flex flex-col w-full">
        <Link to={`/videos/${id}`}>
          <p className="text-slate-900 text-sm font-semibold">{title}</p>
        </Link>
        <div
          onClick={() => authorFilter(author)}
          className="text-gray-400 text-xs mt-2 hover:text-gray-600 cursor-pointer"
        >
          {author}
        </div>
        <p className="text-gray-400 text-xs mt-1">
          {views} views . {date}
        </p>
      </div>
    </div>
  );
};

export default RelatedVideoListItem;

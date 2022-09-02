import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetFilter } from "../../features/filter/filterSlice";
import { fetchTags } from "../../features/tags/tagSlice";
import Tag from "./Tag";

const Tags = () => {
  const tags = useSelector((state) => state.tags.tags);
  const { tags: selectedTags, search } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const handleReset = () => {
    dispatch(resetFilter());
  };

  return tags.length > 0 ? (
    <section>
      <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex justify-between border-b ">
        <div className="flex gap-2 overflow-y-auto ">
          {tags.map((tag) => (
            <Tag key={tag.id} title={tag.title} />
          ))}
        </div>
        {(selectedTags.length > 0 || search) && (
          <button
            className="bg-cyan-200 text-cyan-700 px-4 py-1 rounded-full cursor-pointer hover:bg-cyan-300 hover:text-cyan-800"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
    </section>
  ) : null;
};

export default Tags;

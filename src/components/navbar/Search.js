import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useMatch, useNavigate } from "react-router-dom";
import { searched } from "../../features/filter/filterSlice";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => state.filter);
  const match = useMatch("/");
  const navigate = useNavigate();

  const [input, setInput] = useState(search);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searched(input));

    if (!match) {
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="outline-none border-none mr-2"
        type="search"
        name="search"
        placeholder="Search"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
    </form>
  );
};

export default Search;

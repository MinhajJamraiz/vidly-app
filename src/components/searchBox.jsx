import React from "react";
import Input from "./input";

const SearchBox = ({ value, onChange }) => {
  return (
    <Input
      type="text"
      name="query"
      value={value}
      className="form-control my-3"
      placeholder="search..."
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;

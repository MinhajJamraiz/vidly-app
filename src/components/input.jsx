import React from "react";
const Input = (props) => {
  const { onChange, name, label, value, error } = props;
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={name}
        className="form-control"
        id={name}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;

import React from "react";
const Input = (props) => {
  const { error, name, label, ...rest } = props;
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input {...rest} name={name} className="form-control" id={name} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;

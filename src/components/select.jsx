import React, { Component } from "react";

class Select extends Component {
  render() {
    const { name, label, error, options, ...rest } = this.props;
    return (
      <div className="form-group mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <select name={name} id={name} {...rest} className="form-control">
          <option value="" />
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Select;

// <div className="input-group mb-3">

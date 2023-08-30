import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    console.log(errors);
    return errors;

    // console.log(result);
    // const errors = {};
    // if (this.state.account.username.trim() === "")
    //   errors.username = "username is required.";
    // if (this.state.account.password.trim() === "")
    //   errors.password = "password is required.";

    // return Object.keys(errors).length === 0 ? null : errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    //Server Logic or HTTP request
    console.log("submitted");
  };

  render() {
    return (
      <form>
        <legend>Login</legend>
        <Input
          name="username"
          label="Username"
          value={this.state.account.username}
          onChange={this.handleChange}
          error={this.state.errors.username}
        />
        <Input
          name="password"
          label="Password   "
          value={this.state.account.password}
          onChange={this.handleChange}
          error={this.state.errors.password}
        />

        <button
          onClick={this.handleSubmit}
          disabled={this.validate()}
          type="submit"
          className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}

export default LoginForm;

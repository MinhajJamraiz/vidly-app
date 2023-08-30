import React from "react";
import Joi from "joi-browser";
import Form from "./form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    //Server Logic or HTTP request
    console.log("submitted");
  };

  render() {
    return (
      <form>
        <legend>Login</legend>
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}

        {this.renderButton("Login")}
      </form>
    );
  }
}

export default LoginForm;

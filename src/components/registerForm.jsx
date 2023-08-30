import React from "react";
import Joi from "joi-browser";
import Form from "./form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username").email(),
    password: Joi.string().required().label("Password").min(5),
    name: Joi.string().required().label("name"),
  };

  doSubmit = () => {
    //Server Logic or HTTP request
    console.log("submitted");
  };

  render() {
    return (
      <form>
        <legend>Register</legend>
        {this.renderInput("username", "Username", "email")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name", "text")}

        {this.renderButton("Register")}
      </form>
    );
  }
}

export default RegisterForm;

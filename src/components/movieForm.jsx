import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { getGenres } from "../services/fakeGenreService";

import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      _id: "",
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    genres: [],
  };
  schema = {
    _id: Joi.string().allow("", null),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .label("Number in Stock")
      .max(100)
      .min(0),
    dailyRentalRate: Joi.number()
      .required()
      .label("Daily Rental Rate")
      .max(5)
      .min(0),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === "newMovie") {
      // const data = this.state.data;
      // data._id = "newMovie";
      // this.setState({ data });
      return;
    }

    const movie = getMovie(movieId);

    if (!movie) return this.props.history.replace("/not-found");
    this.setState({ data: this.maptoViewModel(movie) });
  }

  maptoViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  doSubmit = () => {
    //Server Logic or HTTP request
    saveMovie(this.state.data);
    this.props.history.push("/movies");
    console.log("submitted");
  };

  render() {
    return (
      <form>
        <legend>
          {this.state.data._id === "" ? "New Movie " : "Update Movie"}
        </legend>
        {this.renderInput("title", "Title")}
        {this.renderSelect("genreId", "Genre", this.state.genres)}
        {this.renderInput("numberInStock", "Stock", "number")}
        {this.renderInput("dailyRentalRate", "Rate", "number")}

        {this.renderButton("Save")}
      </form>
    );
  }
}

export default MovieForm;

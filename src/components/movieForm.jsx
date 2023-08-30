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
      dailyRetalRate: "",
    },
    errors: {},
    genres: [],
  };
  schema = {
    _id: Joi.string(),
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
    if (movieId === "new") return;

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
        <legend>New Movie</legend>
        {this.renderInput("title", "Title")}
        {this.renderSelect("genreId", "Genre", this.state.genres)}
        {this.renderInput("numberInStock", "Stock")}
        {this.renderInput("dailyRentalRate", "Rate")}

        {this.renderButton("Save")}
      </form>
    );
  }
}

export default MovieForm;

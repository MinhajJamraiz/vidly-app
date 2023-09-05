import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import { getGenres } from "../services/genreService";

import { getMovie, saveMovie } from "../services/movieService";

class MovieForm extends Form {
  state = {
    data: {
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

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }
  async populateMovies() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "newMovie") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.maptoViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        return this.props.history.replace("/not-found");
    }
  }
  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovies();
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
  doSubmit = async () => {
    //Server Logic or HTTP request
    await saveMovie(this.state.data);
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

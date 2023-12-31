import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { deleteMovie, getMovies } from "../services/movieService";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./ListGroup";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SearchBox from "./searchBox";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    searchQuery: "",
    currentGenre: null,
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted");

        this.setState({ movies: originalMovies });
      }
    }
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenresSelect = (genre) => {
    this.setState({ currentGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (searchQuery) => {
    this.setState({ searchQuery, selectedGenre: null, currentPage: 1 });
  };
  // getPagedData = () => {
  //   const { pageSize, currentPage, sortColumn, currentGenre, searchQuery } =
  //     this.state;
  //   let filtered = this.state.movies;
  //   if (searchQuery)
  //     filtered = this.state.movies.filter((m) =>
  //       m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  //     );
  //   else if (currentGenre && currentGenre._id)
  //     filtered = this.state.movies.filter(
  //       (m) => m.genre._id === currentGenre._id
  //     );
  //   const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
  //   const movies = paginate(sorted, currentPage, pageSize);
  //   return { totalCount: filtered.length, data: movies };
  // };
  render() {
    // const { length: count } = this.state.movies;
    const { pageSize, currentGenre, currentPage, sortColumn, searchQuery } =
      this.state;
    let filtered = this.state.movies;
    if (searchQuery)
      filtered = this.state.movies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (currentGenre && currentGenre._id)
      filtered = this.state.movies.filter(
        (m) => m.genre._id === currentGenre._id
      );
    const ordered = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(ordered, currentPage, pageSize);

    return (
      <section className="row mt-5">
        <section className="col-3">
          <ListGroup
            items={this.state.genres}
            currentGenre={this.state.currentGenre}
            onGenreSelected={this.handleGenresSelect}
          />
        </section>
        <section className="col">
          <Link
            style={{ margin: 10 }}
            className=" btn btn-primary"
            to="/movies/newMovie">
            Add Movie
          </Link>
          <p>Showing {filtered.length} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </section>
      </section>
    );
  }
}

export default Movies;

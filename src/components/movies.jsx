import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./ListGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
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
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
    });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
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
    const { length: count } = this.state.movies;
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

    if (count === 0) return <p>There are no movies in the list</p>;
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
            to="/movies/new">
            New Movie
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

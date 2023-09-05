import "./App.css";
import Movies from "./components/movies";
import NavBar from "./components/navBar";
import { Route, Redirect, Switch } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import NewMovieForm from "./components/newMovie";

function App() {
  return (
    <main>
      <ToastContainer />
      <NavBar />
      <div className="container">
        <Switch>
          {/* <Route path="/movies/newMovie" component={NewMovieForm} /> */}
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/notFound" component={NotFound} />
          <Route path="/movies" component={Movies} />
          <Route path="/loginForm" component={LoginForm} />
          <Route path="/registerForm" component={RegisterForm} />

          <Redirect from="/" exact to="/movies" />
          <Redirect to="/notFound" />
        </Switch>
      </div>
    </main>
  );
}

export default App;

import React from "react";
const MovieForm = ({ match, history }) => {
  return (
    <div>
      <h1>MovieForm :{match.params.id} </h1>
      <button
        className="btn btn-secondary"
        onClick={() => history.replace("/movies")}>
        Back
      </button>
    </div>
  );
};

export default MovieForm;

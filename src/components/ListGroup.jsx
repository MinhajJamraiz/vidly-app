import React, { Component } from "react";
class ListGroup extends Component {
  state = {};
  render() {
    const {
      items,
      textProperty,
      valueProperty,
      onGenreSelected,
      currentGenre,
    } = this.props;

    return (
      <ul className="list-group">
        {items.map((item) => (
          <li
            style={{ cursor: "pointer" }}
            onClick={() => {
              onGenreSelected(item);
            }}
            key={item[valueProperty]}
            className={
              item === currentGenre
                ? "list-group-item active"
                : "list-group-item"
            }>
            {item[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;

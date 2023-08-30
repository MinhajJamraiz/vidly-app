import React, { Component } from "react";

import _ from "lodash";

class TableBody extends Component {
  state = {};
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    else return _.get(item, column.path);
  };

  //Movies
  //Ondelete /
  //Onlike
  createKey = (item, column) => {
    return item._id + (column.path || column.key);
  };
  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
// {columns.map((column) =><td>{_.get(dataItem, column.path)}</td>)}

/* <td>{dataItem.title}</td>
<td>{dataItem.genre.name}</td>
<td>{dataItem.numberInStock}</td>
<td>{dataItem.dailyRentalRate}</td>
<td>
  <Like Liked={dataItem.liked} onClick={() => onLike(dataItem)} />
</td>
<td key={dataItem.title + 5}>
  <button
    onClick={() => {
        onDelete(dataItem);
    }}
    className="btn btn-danger btn-sm">
    Delete
  </button>
</td>  */

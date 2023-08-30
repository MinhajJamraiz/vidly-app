import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
class Pagination extends Component {
  state = {};
  render() {
    const { itemsCount, pageSize, currentPage, onPageChange } = this.props;
    const pageCount = itemsCount / pageSize;
    const pages = _.range(1, pageCount + 1);

    if (pageCount > 1)
      return (
        <nav>
          <ul className="pagination">
            {pages.map((page) => (
              <li
                key={page}
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }>
                <a
                  href="#"
                  onClick={() => {
                    onPageChange(page);
                  }}
                  className="page-link">
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      );
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

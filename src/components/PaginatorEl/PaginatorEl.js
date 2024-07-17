/* eslint-disable react/jsx-boolean-value */
import { Pagination } from "antd";
import PropTypes from "prop-types";
import { Component } from "react";

class PaginationEl extends Component {
  shouldComponentUpdate(nextProps) {
    const { totalPages } = this.props;
    return totalPages !== nextProps.totalPages;
  }

  render() {
    const { onPaginatorChangeHandler, totalPages, currentPage } = this.props;
    return (
      <Pagination
        defaultCurrent={currentPage}
        pageSize={20}
        total={totalPages}
        showSizeChanger={false}
        onChange={(numberPage) => {
          onPaginatorChangeHandler(numberPage);
        }}
      />
    );
  }
}

PaginationEl.propTypes = {
  onPaginatorChangeHandler: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default PaginationEl;

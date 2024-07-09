import { Pagination } from "antd";
import PropTypes from "prop-types";

function PaginationEl({ onPaginatorChangeHandler, totalPages, currentPage }) {
  return (
    <Pagination
      defaultCurrent={currentPage}
      total={totalPages}
      onChange={(numberPage) => {
        onPaginatorChangeHandler(numberPage);
      }}
    />
  );
}

PaginationEl.propTypes = {
  onPaginatorChangeHandler: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default PaginationEl;

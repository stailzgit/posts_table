import React from "react";
import { usePagination, DOTS } from "../hooks/usePagination";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (paginationRange.length <= 1) return <></>;

  const lastPage = paginationRange[paginationRange.length - 1];

  const styleBtn = (page) =>
    "pagination__btn " + (currentPage === page && "pagination__btn_disabled");

  const stylePageItem = (page) =>
    "pagination__item " + (currentPage === page && "pagination__item_selected");

  const onNext = () => {
    if (currentPage !== lastPage) onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage !== 1) onPageChange(currentPage - 1);
  };

  return (
    <div className="pagination-container">
      <div className={styleBtn(1)} onClick={onPrevious}>
        Назад
      </div>

      <div className="pagination__items">
        {paginationRange.map((pageNumber) => (
          <div key={pageNumber}>
            {pageNumber === DOTS ? (
              <div className="pagination__dots">&#8230;</div>
            ) : (
              <div
                className={stylePageItem(pageNumber)}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styleBtn(lastPage)} onClick={onNext}>
        Далее
      </div>
    </div>
  );
};

export default Pagination;

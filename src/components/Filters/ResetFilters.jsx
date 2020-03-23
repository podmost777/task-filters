import React from "react";

const ResetFilters = props => {
  return (
    <div className="pb-4">
      <button
        type="button"
        className="btn btn-light"
        onClick={props.resetFilters}
      >
        Очистить фильтры
      </button>
    </div>
  );
};

export default ResetFilters;

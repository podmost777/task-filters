import React from "react";

export default class ResetFilters extends React.Component {
  render() {
    const { resetFilters } = this.props;

    return (
      <div className="pb-4">
        <button type="button" className="btn btn-light" onClick={resetFilters}>
          Очистить фильтры
        </button>
      </div>
    );
  }
}

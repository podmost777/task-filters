import React from "react";
import SortBy from "./SortBy";
import Year from "./Year";
import Paginator from "./Paginator";
import ResetFilters from "./ResetFilters";
import Genre from "./Genre";

export default class Filters extends React.Component {
  render() {
    const {
      filters: { sort_by, release_year },
      page,
      onChangeFilters,
      onChangePage,
      total_pages,
      resetFilters,
      onChangeGenres,
      genres
    } = this.props;

    return (
      <form className="mb-3">
        <ResetFilters resetFilters={resetFilters} />
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} />
        <Year release_year={release_year} onChangeFilters={onChangeFilters} />
        <Genre onChangeGenres={onChangeGenres} genres={genres}/>
        <Paginator
          page={page}
          onChangePage={onChangePage}
          total_pages={total_pages}
        />
      </form>
    );
  }
}

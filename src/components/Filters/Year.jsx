import React from 'react'

const getYears = () => {
    let years = [];
    for (let i = 2025 ; i >= 1950; i--) {
        years.push(i);
    }
    return years;
}

const years = getYears();

export default class Year extends React.PureComponent {

    // shouldComponentUpdate(nextProps, nextState) {
    //     // console.log(this.props);
    //     // console.log(nextProps);
    //     if (nextProps.release_year !== this.props.release_year) {
    //         console.log('1');
    //         return true;
    //     }
    //     return false;
    //     };

    render() {
        const {release_year, onChangeFilters} = this.props;
        return (
            <div className="form-group">
                <label htmlFor="sort_by">Год релиза:</label>
                <select className="form-control" id="release_year" name="release_year" value={release_year} onChange={onChangeFilters}>
                    <option key={-1} value="">
                        Выберите год 
                    </option>
                    {years.map((year, i ) => (
                        <option key={i} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
        )
    }
}
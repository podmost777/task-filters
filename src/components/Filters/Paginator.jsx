import React from 'react'

export default class Paginator extends React.Component {


    render() {

        const { page, onChangePage, total_pages } = this.props;
        
        return (
            <div>
                
                <div className="pb-2">Страница:</div>
                <div className="form-control"> {page} из {total_pages}
                </div>
                <div className="btn-group">
                    <button 
                        type="button" 
                        className="btn btn-light" 
                        disabled={page === 1}
                        onClick={onChangePage.bind(null, (page - 1))}
                    >
                        Назад
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-light" 
                        disabled={page === total_pages}
                        onClick={onChangePage.bind(null, (page + 1))}
                    >
                        Вперёд
                    </button>
                </div>
            </div>
        )
    }
}
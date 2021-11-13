
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = (props) => {
    const { itemsCount, pageSize, onPageChange, currentPage} = props;
    console.log(currentPage)
    const pagesCount = Math.ceil(itemsCount /pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);

    return <nav>
        <ul className="pagination">
            {pages.map(page => (
                 <li key={page} className={ page === currentPage ? 'page-item active' : 'page-item'}>
                     <a className="page-link" onClick={() => onPageChange(page)}>{page}</a></li>
            ))}   
        </ul>
    </nav>
};
//use PropTypes to catch bugs related to type checking/ also gives some
//type of documentation to your component so whenever you want to use a 
//re-usable component, you don't have to look at its render method, to figure
//out what props you shuld give to this component, simple look at the propTypes
Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}
export default Pagination;
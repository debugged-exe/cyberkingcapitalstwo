import React from 'react';
import './Pagination.scss';
const Pagination = ({ postsPerPage, totalPosts }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="junior-log-pagination-container pb4">
            {pageNumbers.map((number) => (
                <button className="ma2">{number}</button>
            ))}
        </div>
    );
};

export default Pagination;
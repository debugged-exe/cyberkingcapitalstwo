import React from 'react';
import './Pagination.scss';
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={'w-100 flex justify-center items-center'}>
            <ul className={'ul-container'}>
                {pageNumbers.map(number=>(
                    <li className={'ul-item'}>
                        {number}
                    </li>
                ))}
            </ul>
            {/*<ul className=' flex justify-center items-center' style={{background:'gray',listStyleType:'none',paddingLeft:'none'}}>*/}
            {/*    {pageNumbers.map(number => (*/}
            {/*        <li key={number} className=' ma2 '>*/}
            {/*            <div onClick={() => paginate(number)} href='!#' className=''>*/}
            {/*                {number}*/}
            {/*            </div>*/}
            {/*        </li>*/}
            {/*    ))}*/}
            {/*</ul>*/}
        </div>
    );
};

export default Pagination;
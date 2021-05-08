import React from 'react';
import './LogCard.scss';

const LogCard = ({Heading, numeric}) => {
    return(
        <div className={'log-card-container shadow-4'}>
            <p className="stat-header b">{Heading}</p>
            <p className="stat-value flex justify-center">{numeric}</p>
        </div>
    );
}
export default LogCard;
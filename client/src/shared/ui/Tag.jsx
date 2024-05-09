import React from 'react';

export const Tag = ({tag}) => {
    return (
        <div className="p-2 h-7 flex justify-center items-center bg-blue-400 text-white text-xs font-inter font-light rounded-lg shadow">
            {tag}
        </div>
    );
};

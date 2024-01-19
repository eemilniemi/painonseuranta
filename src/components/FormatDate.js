import React from 'react';

const stringifyDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2,'0')
    const day = date.getDate().toString().padStart(2,'0')
    return (`${day}-${month}-${year}`);
}

export default stringifyDate;

// SortBy.js
import React from 'react';

function SortBy({ onChange }) {
    return (
        <div className="sort-by">
            <label htmlFor="sort" style={{ marginRight: '8px' }}>Sort by</label>
            <select id="sort" onChange={(e) => onChange(e.target.value)}>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>
        </div>
    );
}

export default SortBy;

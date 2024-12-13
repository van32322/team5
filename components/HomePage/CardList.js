// src/components/CardList.js
import React from 'react';
import './CardList.css';

function CardList({ cards, onDelete }) {
    return (
        <div className="card-list">
            {cards.map((card, index) => (
                <div key={index} className="card">
                    <img src={card} alt={`Card ${index + 1}`} />
                    <div className="delete-container">
                        <button className="delete-button" onClick={() => onDelete(index)}>Xóa</button>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default CardList;

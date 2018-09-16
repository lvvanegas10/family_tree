import React from 'react';
import './DiagramButtons.css';

const DiagramButton = ({ onInit, onUpdateColor, onAddNode }) => {
    return (
        <div className="centered-container">
            <div className="inline-element">
                <button type="button" onClick={onInit}>
                    Add father
                </button>
            </div>
            <div className="inline-element">
                <button type="button" onClick={onUpdateColor}>
                    Add Mother
                </button>
            </div>
            <div className="inline-element" onClick={onAddNode}>
                <button type="button">Add person</button>
            </div>
        </div>
    );
};

export default DiagramButton;
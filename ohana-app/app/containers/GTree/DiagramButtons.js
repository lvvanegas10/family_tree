import React from 'react';

const DiagramButton = ({ addParents, addWife, addHusband, addChildren, saveTree }) => {
    return (
        <div className="centered-container">
            <div className="inline-element">
                <button type="button" onClick={addParents}>
                    Add parents
                </button>
            </div>
            <div className="inline-element" onClick={addWife}>
                <button type="button">
                    Add wife
                </button>
            </div>
            <div className="inline-element" onClick={addHusband}>
                <button type="button">
                    Add husband
                </button>
            </div>
            <div className="inline-element" onClick={addChildren}>
                <button type="button">
                    Add children
                </button>
            </div>
            <div className="inline-element" onClick={saveTree}>
                <button type="button">
                    Save tree
                </button>
            </div>
        </div>
    );
};

export default DiagramButton;
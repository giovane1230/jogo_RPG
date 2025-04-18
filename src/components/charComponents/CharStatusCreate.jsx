import React, { useState } from 'react';

const CharStatusCreate = () => {
    const [points, setPoints] = useState(27);
    const [attributes, setAttributes] = useState({
        str: 8,
        con: 8,
        dex: 8,
        win: 8,
        int: 8,
        cha: 8,
    });

    const pointBuyCost = {
        8: 0,
        9: 1,
        10: 2,
        11: 3,
        12: 4,
        13: 5,
        14: 7,
        15: 9,
      };      

      const handleIncrease = (attr) => {
        const current = attributes[attr];
        const next = current + 1;
        const costCurrent = pointBuyCost[current] ?? 999;
        const costNext = pointBuyCost[next] ?? 999;
        const diff = costNext - costCurrent;
    
        if (next <= 15 && points >= diff) {
            setAttributes({ ...attributes, [attr]: next });
            setPoints(points - diff);
        }
    };
    
    const handleDecrease = (attr) => {
        const current = attributes[attr];
        const prev = current - 1;
        const costCurrent = pointBuyCost[current] ?? 0;
        const costPrev = pointBuyCost[prev] ?? 0;
        const refund = costCurrent - costPrev;
    
        if (prev >= 8) {
            setAttributes({ ...attributes, [attr]: prev });
            setPoints(points + refund);
        }
    };
    
    const getModifier = (score) => Math.floor((score - 10) / 2);

    return (
        <div>
            <h2>Distribuição de Pontos</h2>
            <p>Pontos disponíveis: {points}</p>
            <div>
                {Object.keys(attributes).map((attr) => (
                    <div key={attr}>
                        <span>{attr.charAt(0).toUpperCase() + attr.slice(1)}: {attributes[attr]} </span>
                        <span>( {getModifier(attributes[attr])} )</span>
                        <span>
                        </span>
                        <button onClick={() => handleIncrease(attr)}>+</button>
                        <button onClick={() => handleDecrease(attr)}>-</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CharStatusCreate;
import React from 'react';
import ClassSelection from '../../components/createCharComponents/ClassSelection';

const CharCreate = () => {

    return (
        <div style={{ padding: '20px' }}>
            <h1>Criação de Personagem</h1>
            <ClassSelection />
        </div>
    );
};

export default CharCreate;